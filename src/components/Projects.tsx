
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Import project data
import { projects } from '@/data/projects';

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = filter && filter !== 'All' 
    ? projects.filter(project => project.category === filter)
    : projects;

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.remove('inactive');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.project-reveal');
    revealElements.forEach((element, index) => {
      element.classList.add('inactive');
      // Add staggered delay
      (element as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      observer.observe(element);
    });

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [filteredProjects]);

  return (
    <section id="projects" className="section py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="pixel-button bg-accent/20 text-accent border-accent/20 mb-4 font-mono">Portfolio</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">Featured Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            Three pixel-perfect projects that drove real results for real clients.
          </p>
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-reveal reveal">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
