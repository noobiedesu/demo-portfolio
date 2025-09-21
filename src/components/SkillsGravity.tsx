import React, { useState, useEffect, useRef, useCallback } from 'react';

// Updated skills list to match resume
const skills = [
  "SEO & Content Strategy",
  "Local SEO & CRO", 
  "CRM & Email Automation",
  "Performance Marketing",
  "Analytics & Reporting",
  "Data Analysis",
  "Campaign Development"
];

const SkillsGravity = () => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);
  const chipRefs = useRef<Array<{ body: any; element: HTMLElement }>>([]);

  // Keyboard handler for accessibility
  const handleKeyDown = useCallback((event: KeyboardEvent, chipIndex: number) => {
    if (!engineRef.current || !chipRefs.current[chipIndex]) return;
    
    const { body } = chipRefs.current[chipIndex];
    const force = 0.01;
    
    switch (event.key) {
      case 'ArrowUp':
        // @ts-ignore
        Matter.Body.applyForce(body, body.position, { x: 0, y: -force });
        break;
      case 'ArrowDown':
        // @ts-ignore
        Matter.Body.applyForce(body, body.position, { x: 0, y: force });
        break;
      case 'ArrowLeft':
        // @ts-ignore
        Matter.Body.applyForce(body, body.position, { x: -force, y: 0 });
        break;
      case 'ArrowRight':
        // @ts-ignore
        Matter.Body.applyForce(body, body.position, { x: force, y: 0 });
        break;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills-gravity');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    let Matter: any;
    
    const initPhysics = async () => {
      // Dynamic import of Matter.js
      Matter = await import('matter-js');
      
      const container = containerRef.current!;
      const containerRect = container.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      
      // Create engine with throttled runner for mobile
      const engine = Matter.Engine.create();
      engine.world.gravity.y = 0.8;
      
      const runner = Matter.Runner.create({
        fps: isMobile ? 30 : 60,
        correction: 1,
        deltaSampleSize: 60,
        delta: 1000 / (isMobile ? 30 : 60)
      });
      
      // Create render
      const render = Matter.Render.create({
        element: container,
        engine: engine,
        options: {
          width: containerRect.width,
          height: containerRect.height,
          wireframes: false,
          background: 'transparent',
          showAngleIndicator: false,
          showVelocity: false
        }
      });

      // Create boundaries
      const walls = [
        Matter.Bodies.rectangle(containerRect.width / 2, -10, containerRect.width, 20, { isStatic: true }),
        Matter.Bodies.rectangle(containerRect.width / 2, containerRect.height + 10, containerRect.width, 20, { isStatic: true }),
        Matter.Bodies.rectangle(-10, containerRect.height / 2, 20, containerRect.height, { isStatic: true }),
        Matter.Bodies.rectangle(containerRect.width + 10, containerRect.height / 2, 20, containerRect.height, { isStatic: true })
      ];

      // Create skill chips
      const chipElements = container.querySelectorAll('[data-skill-chip]') as NodeListOf<HTMLElement>;
      const bodies: Array<{ body: any; element: HTMLElement }> = [];
      
      chipElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Random initial positions to avoid overlap
        const x = Math.random() * (containerRect.width - 120) + 60;
        const y = Math.random() * 100 + 50;
        
        const body = Matter.Bodies.rectangle(x, y, 120, 40, {
          restitution: 0.6,
          friction: 0.3,
          frictionAir: 0.01,
          render: { visible: false }
        });
        
        bodies.push({ body, element });
        element.style.position = 'absolute';
        element.style.transform = `translate(${x - 60}px, ${y - 20}px)`;
      });

      // Add mouse constraint for dragging
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: Matter.Mouse.create(render.canvas),
        constraint: {
          stiffness: 0.1,
          damping: 0.05,
          render: { visible: false }
        }
      });

      // Add touch support
      const mouse = mouseConstraint.mouse;
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      // Add all bodies to world
      Matter.World.add(engine.world, [...walls, ...bodies.map(b => b.body), mouseConstraint]);

      // Update DOM elements positions
      const updatePositions = () => {
        bodies.forEach(({ body, element }) => {
          const x = body.position.x;
          const y = body.position.y;
          element.style.transform = `translate(${x - 60}px, ${y - 20}px)`;
        });
      };

      Matter.Events.on(engine, 'afterUpdate', updatePositions);

      // Start engine and runner
      Matter.Render.run(render);
      Matter.Runner.run(runner, engine);

      // Store refs
      engineRef.current = engine;
      renderRef.current = render;
      chipRefs.current = bodies;
    };

    initPhysics();

    return () => {
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas?.remove();
      }
    };
  }, [isInView]);

  return (
    <section id="skills-gravity" className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="pixel-title text-center mb-8">
          🎯 Core Skills Playground
        </h2>
        
        <div className="max-w-4xl mx-auto">          
          {isInView && (
            <div 
              ref={containerRef}
              className="relative h-72 md:h-96 bg-gradient-to-b from-blue-100 to-white border-2 border-gray-300 rounded-lg overflow-hidden"
              style={{ contain: 'paint' }}
            >
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  data-skill-chip
                  role="button"
                  tabIndex={0}
                  aria-label={skill}
                  onKeyDown={(e) => handleKeyDown(e.nativeEvent, index)}
                  className="border-2 border-blue-500 rounded-sm px-4 py-2 bg-blue-100 text-blue-800 font-mono text-sm hover:shadow-neon-blue transition-all cursor-grab active:cursor-grabbing select-none"
                  style={{ 
                    willChange: 'transform, opacity',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
          
          {!isInView && (
            <div className="relative h-72 md:h-96 bg-gradient-to-b from-blue-100 to-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600 font-mono">
                <div className="animate-pulse">🎯</div>
                <p className="mt-2">Skills playground loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsGravity;