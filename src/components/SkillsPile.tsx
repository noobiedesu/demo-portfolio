import React, { useState, useEffect } from 'react';

interface Skill {
  id: number;
  name: string;
  desc: string;
}

const skills: Skill[] = [
  { id: 1, name: "SEO & Content Strategy", desc: "Content strategy, keyword research, on-page optimization" },
  { id: 2, name: "Local SEO & CRO", desc: "Top Google Maps ranking, landing page optimization" },
  { id: 3, name: "CRM & Email Automation", desc: "Zoho workflows, 29-70% open rate campaigns" },
  { id: 4, name: "Performance Marketing", desc: "Google Ads optimization, +14.5% CTR improvement" },
  { id: 5, name: "Analytics & Reporting", desc: "SEMrush/Ahrefs analysis, performance tracking" },
  { id: 6, name: "Data Analysis", desc: "Customer insights, Excel/PowerPoint proficiency" },
  { id: 7, name: "Campaign Development", desc: "Cross-platform campaigns, MOS course development" },
  { id: 8, name: "Project Management", desc: "Multi-tasking, event organization, team coordination" },
  { id: 9, name: "Communication Skills", desc: "B2B/B2C sales, teamwork, presentation skills" }
];

interface SkillChipProps {
  skill: Skill;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}

const SkillChip: React.FC<SkillChipProps> = ({ skill, index, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Create deterministic but varied positions for each skill
  const positions = [
    { x: 15, y: 20, rotation: -2 },
    { x: 60, y: 15, rotation: 3 },
    { x: 25, y: 45, rotation: -1 },
    { x: 70, y: 40, rotation: 2 },
    { x: 10, y: 65, rotation: 1 },
    { x: 55, y: 65, rotation: -3 },
    { x: 35, y: 25, rotation: 2 },
    { x: 45, y: 80, rotation: -1 },
    { x: 80, y: 70, rotation: 1 }
  ];
  
  const position = positions[index] || { x: 50, y: 50, rotation: 0 };
  
  return (
    <div
      className={`
        absolute px-3 py-2 border-2 border-dashed border-primary
        bg-background/80 backdrop-blur-sm font-mono text-xs md:text-sm
        cursor-pointer select-none transition-all duration-300 ease-out
        hover:scale-110 hover:z-20 hover:shadow-lg hover:shadow-primary/50
        active:scale-95 transform-gpu will-change-transform
        ${isActive ? 'shadow-lg shadow-primary/50 scale-105 z-10' : ''}
        ${isHovered ? 'animate-pulse' : ''}
      `}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation + (isActive ? 5 : 0)}deg)`,
        zIndex: isActive ? 10 : Math.floor(Math.random() * 5) + 1,
        animationDelay: `${index * 100}ms`
      }}
      onClick={onActivate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onActivate}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name}: ${skill.desc}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      <div className="relative">
        <strong className="block text-center leading-tight">
          {skill.name}
        </strong>
        {isActive && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 
                         bg-card border border-border rounded-md shadow-lg z-20 w-48 text-xs">
            {skill.desc}
          </div>
        )}
      </div>
    </div>
  );
};

const SkillsPile: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    setIsMounted(true);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSkillClick = (skillId: number) => {
    setActiveSkill(activeSkill === skillId ? null : skillId);
  };

  if (!isMounted) {
    return (
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="h-80 md:h-96 bg-gradient-to-br from-secondary/20 to-primary/20 
                         border-2 border-dotted border-primary/50 p-4 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="font-mono text-muted-foreground">Loading skills...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="skills" 
      className="py-8 md:py-12"
      aria-label="Technical skills and expertise"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="font-mono font-bold text-2xl md:text-3xl lg:text-4xl mb-4 
                        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            💾 Core Skills
          </h2>
          <p className="font-mono text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            {isMobile ? "Tap skills to view details" : "Click skills to explore my expertise"}
          </p>
        </header>
        
        {isMobile ? (
          <div className="space-y-3 max-w-md mx-auto">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className={`
                  p-3 border-2 border-dashed border-primary/50 bg-background/80 
                  backdrop-blur-sm rounded-lg font-mono text-sm cursor-pointer 
                  transition-all duration-300 hover:border-primary hover:shadow-md
                  ${activeSkill === skill.id ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5' : ''}
                `}
                onClick={() => handleSkillClick(skill.id)}
                role="button"
                tabIndex={0}
                aria-expanded={activeSkill === skill.id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSkillClick(skill.id);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <strong className="text-foreground">{skill.name}</strong>
                  <span className="text-primary text-lg">
                    {activeSkill === skill.id ? '−' : '+'}
                  </span>
                </div>
                {activeSkill === skill.id && (
                  <div className="mt-2 pt-2 border-t border-primary/20 text-muted-foreground text-xs leading-relaxed">
                    {skill.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-80 md:h-96 bg-gradient-to-br from-secondary/20 to-primary/20 
                         border-2 border-dotted border-primary/50 p-4 overflow-hidden rounded-lg">
            {skills.map((skill, index) => (
              <SkillChip
                key={skill.id}
                skill={skill}
                index={index}
                isActive={activeSkill === skill.id}
                onActivate={() => handleSkillClick(skill.id)}
              />
            ))}
            
            {/* Retro grid background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px'
                 }}>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsPile;