
import React, { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = filter && filter !== 'All' 
    ? projects.filter(project => project.category === filter)
    : projects;

  return (
    <section id="projects" className="section bg-brand-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-brand-purple/10 text-brand-purple border-none mb-4">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore a selection of my most impactful marketing campaigns and brand strategies that delivered exceptional results.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category, index) => (
            <Badge 
              key={index}
              className={`cursor-pointer px-4 py-2 ${
                (filter === category || (filter === null && category === 'All'))
                  ? 'bg-brand-purple text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => setFilter(category === 'All' ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
