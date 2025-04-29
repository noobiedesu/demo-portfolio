
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
          <Badge className="bg-gradient-to-r from-[#FFC0CB]/30 to-[#1E90FF]/30 text-gray-700 border-none mb-4">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A selection of marketing and development projects showcasing my dual expertise in technical implementation and creative strategy.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 px-2">
          {categories.map((category, index) => (
            <Badge 
              key={index}
              className={`cursor-pointer px-4 py-2 ${
                (filter === category || (filter === null && category === 'All'))
                  ? 'bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF] text-white'
                  : 'bg-white hover:bg-gray-100'
              } transition-all duration-300`}
              onClick={() => setFilter(category === 'All' ? null : category)}
            >
              {category}
            </Badge>
          ))}
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
