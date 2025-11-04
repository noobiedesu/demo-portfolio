import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const CoreSkillsAccordion: React.FC = () => {
  return (
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
            Click to expand and view detailed achievements
          </p>
        </header>

        <div className="min-h-80 h-auto bg-gradient-to-br from-secondary/20 to-primary/20 
                        border-2 border-dotted border-primary/50 p-4 md:p-6 rounded-lg">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {coreSkills.map((skill, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="border-2 border-dashed border-primary/50 bg-background/50 backdrop-blur-sm 
                          rounded-md overflow-hidden hover:shadow-[0_0_15px_hsl(var(--primary))] 
                          transition-all duration-300"
              >
                <AccordionTrigger 
                  className="px-4 py-3 min-h-12 font-mono text-sm md:text-base 
                            hover:bg-primary/10 transition-colors select-none
                            [&[data-state=open]]:bg-primary/20"
                  aria-label={`${skill.name}: Toggle for details`}
                >
                  <strong className="text-left">{skill.name}</strong>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-card/80 text-sm leading-relaxed border-t border-primary/30">
                  <p className="font-mono text-foreground select-text">
                    {skill.details.split(/(\d+\.?\d*%|\d+–\d+)/).map((part, idx) => 
                      /\d/.test(part) ? <strong key={idx} className="text-primary">{part}</strong> : part
                    )}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CoreSkillsAccordion;
