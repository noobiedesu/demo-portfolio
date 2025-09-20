import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Gravity, GravityItem } from '@/components/ui/gravity';
import { skills } from '@/data/skills.data';

const SkillsGravity = () => {
  const [isInView, setIsInView] = useState(false);

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

  return (
    <section id="skills-gravity" className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="pixel-title text-center mb-8">
          🎯 Core Skills Playground
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-muted-foreground font-mono mb-8 text-sm">
            Drag the skills around! They have physics - gravity, bounce, and collision.
          </p>
          
          {isInView && (
            <Gravity 
              className="pixel-card bg-background/50 backdrop-blur-sm h-[300px] md:h-[500px] border-2 border-primary/20 rounded-[10px] relative overflow-hidden"
              gravity={0.3}
              friction={0.98}
              bounce={0.7}
            >
              {skills.map((skill, index) => (
                <GravityItem key={skill} id={`skill-${index}`}>
                  <Badge
                    className={`
                      pixel-badge px-4 py-2 text-sm font-mono font-medium
                      border-2 border-primary/30 rounded-[10px]
                      bg-background/80 backdrop-blur-sm
                      hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-500/20
                      hover:border-pink-500/50 hover:shadow-lg hover:shadow-primary/25
                      transition-all duration-300 ease-out
                      cursor-grab active:cursor-grabbing
                      select-none
                      neon-glow-hover
                    `}
                    variant="outline"
                    aria-label={`Skill: ${skill}`}
                  >
                    {skill}
                  </Badge>
                </GravityItem>
              ))}
              
              {/* Gravity visualization hints */}
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/50 font-mono">
                ⬇️ Gravity Active
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50 font-mono">
                🎮 Drag to Play
              </div>
            </Gravity>
          )}
          
          {!isInView && (
            <div className="pixel-card bg-background/50 h-[300px] md:h-[500px] border-2 border-primary/20 rounded-[10px] flex items-center justify-center">
              <div className="text-center text-muted-foreground font-mono">
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