import React, { useState, useEffect, useRef } from 'react';
import { skills } from '@/data/skills.data';

// Lazy load Matter.js to avoid bundle bloat
const loadMatter = () => import('matter-js');

const SkillsGravity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);
  const runnerRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialized) {
          setIsInView(true);
          initEngine();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInitialized]);

  const initEngine = async () => {
    if (!containerRef.current || !canvasRef.current || isInitialized) return;

    try {
      const Matter = await loadMatter();
      const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width;
      const height = isMobile ? 288 : 384; // h-72 = 288px, h-96 = 384px

      // Create engine with optimized settings
      const engine = Engine.create();
      engine.world.gravity.y = 0.5; // Lighter gravity
      engine.enableSleeping = true; // Enable sleeping for performance
      
      // Create renderer with anti-flicker settings
      const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: width,
          height: height,
          wireframes: false,
          background: 'transparent',
          showVelocity: false,
          showAngleIndicator: false,
          showDebug: false,
        }
      });

      // Create boundaries (invisible walls)
      const boundaries = [
        Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }), // floor
        Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }), // left wall
        Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true }), // right wall
      ];

      // Create skill bodies with random initial positions near top
      const skillBodies = skills.map((skill, index) => {
        const skillWidth = Math.max(120, skill.length * 8);
        const skillHeight = 40;
        const randomX = Math.random() * (width - skillWidth - 40) + skillWidth / 2 + 20;
        const randomY = Math.random() * 50 + 20; // Random position near top

        return Bodies.rectangle(randomX, randomY, skillWidth, skillHeight, {
          restitution: 0.3, // Low bounce for quick settle
          friction: 0.1,
          slop: 0.05, // Reduce collision jitter
          collisionFilter: {
            category: 0x0001 << index,
            mask: 0xFFFFFFFF
          },
          render: {
            fillStyle: 'transparent'
          },
          label: skill
        });
      });

      // Add mouse constraint for dragging
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          damping: 0.05,
          render: {
            visible: false
          }
        }
      });

      // Add all bodies to world
      World.add(engine.world, [...boundaries, ...skillBodies, mouseConstraint]);

      // Create runner with optimized FPS (30fps = 33.33ms delta)
      const runner = Runner.create({
        delta: 33.33
      });

      // Store references
      engineRef.current = engine;
      renderRef.current = render;
      runnerRef.current = runner;

      // Start rendering and running
      Render.run(render);
      Runner.run(runner, engine);

      // Sleep detection for performance optimization
      const { Events } = Matter;
      Events.on(engine, 'sleepStart', () => {
        // Check if all bodies are sleeping
        const allSleeping = engine.world.bodies.every(body => body.isSleeping || body.isStatic);
        if (allSleeping && runnerRef.current) {
          Runner.stop(runnerRef.current);
          setTimeout(() => {
            if (runnerRef.current && engineRef.current) {
              Runner.run(runnerRef.current, engineRef.current);
            }
          }, 100); // Resume after brief pause
        }
      });

      // Create DOM elements for each skill
      skillBodies.forEach((body, index) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = `
          absolute pointer-events-none select-none
          px-4 py-2 border-2 border-purple-400 bg-gradient-to-r from-blue-100 to-purple-100
          text-purple-800 font-mono text-sm font-medium
          rounded-sm shadow-sm
          hover:shadow-[0_0_10px_cyan] transition-all duration-300
          will-change-transform
        `;
        skillDiv.style.transform = `translate(${body.position.x - body.bounds.max.x / 2}px, ${body.position.y - body.bounds.max.y / 2}px)`;
        skillDiv.textContent = skills[index];
        skillDiv.setAttribute('aria-label', `Skill: ${skills[index]}`);
        skillDiv.setAttribute('role', 'button');
        skillDiv.setAttribute('tabindex', '0');
        
        // Keyboard navigation
        skillDiv.addEventListener('keydown', (e) => {
          const nudge = 10;
          let newX = body.position.x;
          let newY = body.position.y;
          
          switch(e.key) {
            case 'ArrowLeft':
              newX -= nudge;
              break;
            case 'ArrowRight':
              newX += nudge;
              break;
            case 'ArrowUp':
              newY -= nudge;
              break;
            case 'ArrowDown':
              newY += nudge;
              break;
            default:
              return;
          }
          
          Matter.Body.setPosition(body, { x: newX, y: newY });
          e.preventDefault();
        });

        container.appendChild(skillDiv);

        // Update DOM position on each frame
        const updatePosition = () => {
          if (skillDiv && body) {
            const x = body.position.x - (body.bounds.max.x - body.bounds.min.x) / 2;
            const y = body.position.y - (body.bounds.max.y - body.bounds.min.y) / 2;
            skillDiv.style.transform = `translate(${x}px, ${y}px)`;
          }
        };

        // Use requestAnimationFrame for smooth updates
        const animate = () => {
          updatePosition();
          if (engineRef.current) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Matter.js:', error);
    }
  };

  useEffect(() => {
    return () => {
      // Proper cleanup
      if (runnerRef.current && engineRef.current) {
        loadMatter().then(Matter => {
          Matter.Runner.stop(runnerRef.current);
          Matter.Render.stop(renderRef.current);
          Matter.Engine.clear(engineRef.current);
        });
      }
    };
  }, []);

  return (
    <section id="skills-gravity" className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="pixel-title text-center mb-8">
          🎯 Core Skills Playground
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className={`
              relative overflow-hidden
              ${isMobile ? 'h-72' : 'h-96'}
              bg-gradient-to-b from-blue-100 to-purple-100
              border-2 border-dotted border-purple-300
              rounded-lg
              will-change-transform
            `}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0"
              style={{ pointerEvents: 'auto' }}
            />
            
            {!isInView && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-purple-600 font-mono">
                  <div className="animate-pulse text-2xl">🎯</div>
                  <p className="mt-2 text-sm">Skills playground loading...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsGravity;