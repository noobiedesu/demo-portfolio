import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Skill {
  name: string;
  details: string;
}

const coreSkills: Skill[] = [
  { name: "SEO & Content Strategy", details: "Planned keyword mapping and content architecture; boosted website users by 51.5% and secured top 1–3 Google Maps ranking for 4 years." },
  { name: "Local SEO & CRO", details: "Optimized landing pages and CTAs; boosted traffic by 12.7% through conversion-focused design." },
  { name: "CRM & Email Automation", details: "Built segmented workflows in CRM; achieved up to 70% open rate and 18% CTR." },
  { name: "Performance Marketing", details: "Managed Google Ads optimization; raised CTR by 14.5% and reduced low-quality leads by 30%." },
  { name: "Analytics & Data Insights", details: "Used GA, GSC, SEMrush, Ahrefs for customer insights and strategy guidance." },
  { name: "Campaign Development", details: "Created cross-platform marketing campaigns and MOS course promotions." },
  { name: "Project Management", details: "Led multi-team projects and educational events; ensured timely, aligned delivery." },
  { name: "Communication & Collaboration", details: "Built strong B2B/B2C communication; enhanced engagement and teamwork." }
];

// Smart positioning using 3x3 grid zones to avoid heavy overlap
const getSmartPosition = (index: number): { left: string; top: string } => {
  const positions = [
    { left: '15%', top: '20%' },
    { left: '50%', top: '15%' },
    { left: '75%', top: '25%' },
    { left: '20%', top: '45%' },
    { left: '60%', top: '50%' },
    { left: '80%', top: '55%' },
    { left: '25%', top: '75%' },
    { left: '55%', top: '80%' },
  ];
  return positions[index] || { left: '50%', top: '50%' };
};

const SkillTag = React.memo(({ skill, index, isMobile }: { skill: Skill; index: number; isMobile: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const position = useMemo(() => getSmartPosition(index), [index]);

  const tagContent = (
    <button
      className="px-4 py-2 min-w-[8rem] border-2 border-dashed border-primary bg-background/50 
                 backdrop-blur-sm font-mono text-xs md:text-sm cursor-pointer 
                 hover:shadow-[0_0_15px_hsl(var(--primary))] hover:scale-105
                 transition-all duration-300 will-change-transform
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                 active:scale-95 select-none"
      style={!isMobile ? { position: 'absolute', left: position.left, top: position.top } : {}}
      aria-label={`${skill.name}: Hover for quick view, click for details`}
      tabIndex={0}
    >
      <strong className="block text-center leading-tight">{skill.name}</strong>
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            {tagContent}
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-[250px] text-xs bg-card border-primary/50"
        >
          {skill.details.slice(0, 60)}...
        </TooltipContent>
      </Tooltip>
      
      <DialogContent className="max-w-md md:max-w-lg bg-gradient-to-br from-secondary/20 to-primary/20 
                                border-2 border-primary/50 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-mono text-lg md:text-xl text-primary">
            {skill.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 bg-card/80 rounded-md border border-primary/30 text-sm leading-relaxed">
          <p className="font-mono text-foreground select-text">
            {skill.details.split(/(\d+\.?\d*%|\d+–\d+)/).map((part, i) => 
              /\d/.test(part) ? <strong key={i} className="text-primary">{part}</strong> : part
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
});

SkillTag.displayName = 'SkillTag';

const CoreSkillsCloud: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setIsMounted(true);

    const throttledResize = () => {
      checkMobile();
    };
    
    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-80 h-auto md:h-96 bg-gradient-to-br from-secondary/20 to-primary/20 
                      border-2 border-dotted border-primary/50 p-4 animate-pulse">
        <div className="flex items-center justify-center h-full">
          <span className="font-mono text-muted-foreground text-sm">Loading skills...</span>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <section 
        id="skills" 
        className="py-8 md:py-12"
        aria-label="Core technical skills and achievements"
      >
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h2 className="font-mono font-bold text-2xl md:text-3xl lg:text-4xl mb-4 
                          bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              💾 Core Skills
            </h2>
            <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              {isMobile ? "Tap skills for details" : "Hover for quick view • Click for full details"}
            </p>
          </header>

          <div className={`
            relative min-h-80 h-auto md:h-96 
            bg-gradient-to-br from-secondary/20 to-primary/20 
            border-2 border-dotted border-primary/50 
            p-4 rounded-lg
            ${isMobile ? 'flex flex-col gap-3 overflow-auto' : 'overflow-hidden'}
          `}>
            {coreSkills.map((skill, index) => (
              <SkillTag 
                key={skill.name} 
                skill={skill} 
                index={index} 
                isMobile={isMobile}
              />
            ))}

            {/* Retro grid background */}
            {!isMobile && (
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default CoreSkillsCloud;
