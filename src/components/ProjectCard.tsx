
import React from 'react';
import { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="pixel-card h-full flex flex-col group transition-all duration-200 hover:shadow-xl bg-card">
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover pixel-image transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Pixel overlay that slides up on hover */}
        <div className="project-overlay absolute inset-0 bg-primary/90 flex flex-col justify-center items-center px-4 opacity-0 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out text-primary-foreground">
          <h4 className="text-lg font-bold mb-2 font-mono">{project.title}</h4>
          <p className="text-sm mb-4 text-center font-mono">{project.description}</p>
          <Button variant="outline" className="pixel-button bg-background/20 text-foreground border-foreground hover:bg-background/40 flex items-center gap-2">
            View Details
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="pixel-button bg-primary/10 text-primary border-primary/20 font-mono text-xs">
            {project.category}
          </Badge>
        </div>
        <CardTitle className="text-lg font-mono">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2 font-mono text-sm">{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2 flex-wrap mt-auto pt-2 p-4">
        {project.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs bg-accent/10 text-accent font-mono pixel-button">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
