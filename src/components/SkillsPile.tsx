import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Skill {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
}

interface SkillChipProps {
  skill: Skill;
  isMobile: boolean;
  onMove: (id: string, position: { x: number; y: number }) => void;
  isHighlighted: boolean;
  onHighlight: (id: string | null) => void;
}

const skills: Skill[] = [
  {
    id: 'seo-content',
    name: 'SEO & Content Strategy',
    description: 'Content strategy, keyword research, organic growth',
    position: { x: 15, y: 25, z: 3 }
  },
  {
    id: 'local-seo',
    name: 'Local SEO & CRO',
    description: 'Top Google Maps ranking, conversion optimization',
    position: { x: 45, y: 35, z: 7 }
  },
  {
    id: 'crm-email',
    name: 'CRM & Email Automation',
    description: 'Zoho CRM, email campaigns, open rates 29-70%',
    position: { x: 70, y: 20, z: 2 }
  },
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    description: 'Google Ads CTR +14.5%, paid campaign optimization',
    position: { x: 25, y: 55, z: 8 }
  },
  {
    id: 'analytics-reporting',
    name: 'Analytics & Reporting',
    description: 'Data analysis, performance tracking, insights',
    position: { x: 65, y: 45, z: 1 }
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Excel analysis, customer insights, data-driven decisions',
    position: { x: 10, y: 45, z: 5 }
  },
  {
    id: 'campaign-development',
    name: 'Campaign Development',
    description: 'Multi-channel campaigns, MOS course promotion',
    position: { x: 85, y: 30, z: 4 }
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Cross-functional coordination, timeline management',
    position: { x: 40, y: 65, z: 6 }
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    description: 'Stakeholder relations, presentation, documentation',
    position: { x: 80, y: 55, z: 9 }
  }
];

const SkillChip: React.FC<SkillChipProps> = ({ skill, isMobile, onMove, isHighlighted, onHighlight }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'skill',
    item: { id: skill.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isMobile,
  });

  const [, drop] = useDrop({
    accept: 'skill',
    drop: (item: { id: string }, monitor) => {
      if (!ref.current) return;
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const rect = ref.current.parentElement?.getBoundingClientRect();
        if (rect) {
          const newX = Math.max(0, Math.min(80, (delta.x / rect.width) * 100));
          const newY = Math.max(10, Math.min(70, (delta.y / rect.height) * 100));
          onMove(item.id, { x: newX, y: newY });
        }
      }
    },
  });

  const handleMobileHighlight = useCallback(() => {
    if (isMobile) {
      onHighlight(isHighlighted ? null : skill.id);
    }
  }, [isMobile, isHighlighted, skill.id, onHighlight]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMobileHighlight();
    }
  }, [handleMobileHighlight]);

  drag(drop(ref));

  const chipStyles = isMobile 
    ? "w-full flex-shrink-0 mb-2"
    : `absolute transform -translate-x-1/2 -translate-y-1/2`;

  const positionStyles = isMobile 
    ? {} 
    : {
        left: `${skill.position.x}%`,
        top: `${skill.position.y}%`,
        zIndex: skill.position.z,
      };

  return (
    <div
      ref={ref}
      className={`
        ${chipStyles}
        pixel-badge border-2 border-dashed border-purple-500 bg-white/50 
        px-3 py-2 cursor-move select-none transition-all duration-300
        font-mono text-xs md:text-sm font-bold
        hover:shadow-[0_0_15px_cyan] hover:bg-white/70
        ${isDragging ? 'opacity-50 scale-110' : ''}
        ${isHighlighted ? 'shadow-[0_0_15px_cyan] bg-white/70' : ''}
        ${isMobile ? 'cursor-pointer' : ''}
      `}
      style={positionStyles}
      onClick={handleMobileHighlight}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="listitem"
      aria-label={`${skill.name}: ${skill.description}`}
      title={skill.description}
    >
      <span className="break-words">{skill.name}</span>
    </div>
  );
};

const SkillsPile: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [skillPositions, setSkillPositions] = useState(skills);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [isDndLoaded, setIsDndLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || navigator.hardwareConcurrency < 4;
      setIsMobile(mobile);
      
      // Lazy load react-dnd only for desktop
      if (!mobile && !isDndLoaded) {
        setIsDndLoaded(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isDndLoaded]);

  const moveSkill = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setSkillPositions(prev => 
      prev.map(skill => 
        skill.id === id 
          ? { ...skill, position: { ...skill.position, ...newPosition } }
          : skill
      )
    );
  }, []);

  const containerStyles = isMobile
    ? "h-80 flex flex-col gap-2 p-4 overflow-y-auto"
    : "h-96 relative p-4 overflow-hidden";

  const SkillsContent = () => (
    <section 
      id="skills" 
      className="py-8 md:py-12"
      aria-label="Technical skills and expertise"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="pixel-title font-mono font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            💾 Core Skills
          </h2>
          <p className="font-mono text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {isMobile ? "Tap skills to highlight" : "Drag and rearrange the skill chips below"}
          </p>
        </header>
        
        <div 
          className={`
            ${containerStyles}
            bg-gradient-to-br from-pink-200 to-purple-300 
            border-2 border-dotted border-cyan-500 rounded-lg
          `}
          style={{
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
            filter: 'url(#pixelate)'
          }}
          role="list"
          aria-label="Skills list"
        >
          {skillPositions.map((skill) => (
            <SkillChip
              key={skill.id}
              skill={skill}
              isMobile={isMobile}
              onMove={moveSkill}
              isHighlighted={highlightedSkill === skill.id}
              onHighlight={setHighlightedSkill}
            />
          ))}
        </div>
      </div>

      {/* SVG Filter for pixel effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="pixelate">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite width="8" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="2" />
          </filter>
        </defs>
      </svg>
    </section>
  );

  // For mobile or when DnD isn't loaded, render without DndProvider
  if (isMobile || !isDndLoaded) {
    return <SkillsContent />;
  }

  // For desktop, wrap with DndProvider
  return (
    <DndProvider backend={HTML5Backend}>
      <SkillsContent />
    </DndProvider>
  );
};

export default SkillsPile;