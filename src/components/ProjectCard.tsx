
import React from 'react';
import { Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="project-card h-full flex flex-col group transition-all duration-300 hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay that slides up on hover */}
        <div className="project-overlay absolute inset-0 bg-gradient-to-t from-[#1E90FF]/80 to-[#FFC0CB]/80 flex flex-col justify-center items-center px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
          <h4 className="text-lg font-bold mb-2">{project.title}</h4>
          <p className="text-sm mb-4 text-center">{project.description}</p>
          <Button variant="outline" className="bg-white/20 text-white border-white hover:bg-white/40 flex items-center gap-2">
            View Details
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-[#1E90FF]/10 text-[#1E90FF] border-[#1E90FF]/20">
            {project.category}
          </Badge>
        </div>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2 flex-wrap mt-auto pt-2">
        {project.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs bg-[#FFC0CB]/10 text-[#FFC0CB]">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
