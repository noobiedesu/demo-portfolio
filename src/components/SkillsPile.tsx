import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Skill {
  id: number;
  name: string;
  desc: string;
}

const skills: Skill[] = [
  { id: 1, name: "SEO & Content Strategy", desc: "Managed content strategy, keyword research, on-page SEO" },
  { id: 2, name: "Local SEO & CRO", desc: "Achieved top Google Maps ranking, landing page optimization" },
  { id: 3, name: "CRM & Email Automation", desc: "Zoho CRM workflows, automated email campaigns with 29-70% open rates" },
  { id: 4, name: "Performance Marketing", desc: "Google Ads collaboration, CTR +14.5%, reduced erroneous leads 30%" },
  { id: 5, name: "Analytics & Reporting", desc: "Data analysis using SEMrush/Ahrefs, performance metrics" },
  { id: 6, name: "Data Analysis", desc: "Customer insights, behavior analysis, Excel/PowerPoint proficiency" },
  { id: 7, name: "Campaign Development", desc: "Developed MOS courses, cross-platform campaigns (Facebook, TikTok)" },
  { id: 8, name: "Project Management", desc: "Multi-tasking, event organization for seminars" },
  { id: 9, name: "Communication Skills", desc: "Strong communication, teamwork, B2B/B2C sales experience" }
];

interface MobileSkillChipProps {
  skill: Skill;
  isHighlighted: boolean;
  onToggleHighlight: () => void;
}

const MobileSkillChip: React.FC<MobileSkillChipProps> = ({ skill, isHighlighted, onToggleHighlight }) => {
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleHighlight();
    }
  }, [onToggleHighlight]);

  return (
    <div 
      onClick={onToggleHighlight}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      className={`
        px-4 py-2 border-2 border-purple-500 bg-white/50 
        font-mono text-sm text-center transition-all cursor-pointer
        hover:shadow-[0_0_15px_cyan] hover:bg-white/70
        ${isHighlighted ? 'shadow-[0_0_15px_cyan] bg-white/70' : ''}
      `}
      aria-label={`${skill.name}: ${skill.desc}`}
      role="button"
    >
      <strong>{skill.name}</strong>
    </div>
  );
};

interface DesktopSkillsProps {
  skills: Skill[];
  onMoveSkill: (fromIndex: number, toIndex: number) => void;
}

const DesktopSkills: React.FC<DesktopSkillsProps> = ({ skills: skillList, onMoveSkill }) => {
  const [dndComponents, setDndComponents] = useState<{
    DndProvider: any;
    useDrag: any;
    useDrop: any;
    HTML5Backend: any;
  } | null>(null);

  useEffect(() => {
    // Dynamically import react-dnd components
    const loadDnd = async () => {
      try {
        const [dnd, backend] = await Promise.all([
          import('react-dnd'),
          import('react-dnd-html5-backend')
        ]);
        
        setDndComponents({
          DndProvider: dnd.DndProvider,
          useDrag: dnd.useDrag,
          useDrop: dnd.useDrop,
          HTML5Backend: backend.HTML5Backend,
        });
      } catch (error) {
        console.warn('Failed to load drag and drop functionality:', error);
      }
    };

    loadDnd();
  }, []);

  const SkillChip: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const ref = useRef<HTMLDivElement>(null);

    if (!dndComponents) {
      return (
        <div 
          className="absolute px-4 py-2 border-2 border-dashed border-purple-500 bg-white/50 font-mono text-sm transition-all duration-300"
          style={{ 
            left: `${Math.random() * 70 + 10}%`, 
            top: `${Math.random() * 50 + 20}%`, 
            zIndex: Math.floor(Math.random() * 10) + 1 
          }}
          title={skill.desc}
        >
          <strong>{skill.name}</strong>
        </div>
      );
    }

    const { useDrag, useDrop } = dndComponents;

    const [{ isDragging }, drag] = useDrag({
      type: 'SKILL',
      item: { id: skill.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'SKILL',
      hover: (item: { id: number; index: number }) => {
        if (item.index !== index) {
          onMoveSkill(item.index, index);
          item.index = index;
        }
      },
    });

    drag(drop(ref));

    return (
      <div 
        ref={ref}
        className={`
          absolute px-4 py-2 border-2 border-dashed border-purple-500 bg-white/50 
          font-mono text-sm cursor-move transition-all duration-300 will-change-transform
          hover:shadow-[0_0_15px_cyan] hover:bg-white/70
          ${isDragging ? 'opacity-50 scale-110' : ''}
        `}
        style={{ 
          left: `${Math.random() * 70 + 10}%`, 
          top: `${Math.random() * 50 + 20}%`, 
          zIndex: Math.floor(Math.random() * 10) + 1 
        }}
        title={skill.desc}
        aria-label={`${skill.name}: ${skill.desc}`}
      >
        <strong>{skill.name}</strong>
      </div>
    );
  };

  if (!dndComponents) {
    return (
      <div className="relative h-80 md:h-96 bg-gradient-to-br from-pink-200 to-purple-300 border-2 border-dotted border-cyan-500 p-4 overflow-hidden">
        {skillList.map((skill, index) => (
          <SkillChip key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    );
  }

  const { DndProvider, HTML5Backend } = dndComponents;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative h-80 md:h-96 bg-gradient-to-br from-pink-200 to-purple-300 border-2 border-dotted border-cyan-500 p-4 overflow-hidden">
        {skillList.map((skill, index) => (
          <SkillChip key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </DndProvider>
  );
};

const SkillsPile: React.FC = () => {
  const [skillList, setSkillList] = useState(skills);
  const [isMobile, setIsMobile] = useState(false);
  const [highlightedSkills, setHighlightedSkills] = useState<Set<number>>(new Set());

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const moveSkill = useCallback((fromIndex: number, toIndex: number) => {
    setSkillList(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  const toggleHighlight = useCallback((skillId: number) => {
    setHighlightedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  }, []);

  return (
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
            {isMobile ? "Tap skills to highlight them" : "Drag and rearrange the skill chips below"}
          </p>
        </header>
        
        {isMobile ? (
          <div className="h-80 bg-gradient-to-br from-pink-200 to-purple-300 border-2 border-dotted border-cyan-500 p-4 overflow-auto flex flex-col gap-2">
            {skillList.map((skill) => (
              <MobileSkillChip
                key={skill.id}
                skill={skill}
                isHighlighted={highlightedSkills.has(skill.id)}
                onToggleHighlight={() => toggleHighlight(skill.id)}
              />
            ))}
          </div>
        ) : (
          <DesktopSkills skills={skillList} onMoveSkill={moveSkill} />
        )}
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
};

export default SkillsPile;