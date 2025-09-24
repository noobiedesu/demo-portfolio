
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import avatarImage from '@/assets/avatar.png';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20 px-4 md:px-0 py-12 md:py-16 lg:py-20"
      aria-label="Homepage hero section"
    >
      {/* Pixel background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/30 pixel-card" aria-hidden="true"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/30 pixel-card" aria-hidden="true"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/20 pixel-card hidden md:block" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <header className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-8 flex justify-center">
            <img 
              src={avatarImage} 
              alt="Professional headshot of Tran Thi Duyen, Digital Marketing Specialist with 3+ years of experience in SEO, Performance Marketing, and CRM automation"
              className="w-24 h-24 md:w-32 md:h-32 pixel-image pixel-card border-4 border-primary"
              loading="eager"
              fetchPriority="high"
              width="128"
              height="128"
            />
          </div>
          
          <h1 className="font-mono font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight mb-6 animate-[fade-in_1s_ease-out]">
            👋 Hi there, I'm <span className="text-primary">Tran Duyen</span>
          </h1>
          
          <p className="font-mono text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground mb-10 max-w-2xl mx-auto animate-[fade-in_1.2s_ease-out]">
            Digital Marketing Specialist crafting strategies that resonate, not just decorate
          </p>
          
          <nav className="flex flex-col sm:flex-row justify-center gap-4 animate-[fade-in_1.4s_ease-out]" aria-label="Primary actions">
            <Button 
              asChild 
              className="pixel-button text-xs md:text-sm px-8 py-4 group"
              aria-label="View my marketing case studies and project results"
            >
              <a href="#case-studies">
                View Case Studies
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="pixel-button text-xs md:text-sm px-8 py-4 group"
              aria-label="Download my resume as PDF"
            >
              <a href="assets/Tran_Thi_Duyen_CV.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
              </a>
            </Button>
          </nav>
          
          {/* Key Performance Metrics */}
          <section className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-[fade-in_1.6s_ease-out]" aria-label="Key performance achievements">
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-xl md:text-2xl font-bold text-primary font-mono" aria-label="2.55 million users reached per year">2.55M</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">Users/Year</p>
            </div>
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-xl md:text-2xl font-bold text-accent font-mono" aria-label="12.7 percent traffic increase">+12.7%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">Traffic Lift</p>
            </div>
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-xl md:text-2xl font-bold text-primary font-mono" aria-label="14.5 percent CTR improvement">+14.5%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">CTR Improvement</p>
            </div>
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-xl md:text-2xl font-bold text-accent font-mono" aria-label="29 to 70 percent email open rate">29-70%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">Email Open Rate</p>
            </div>
          </section>
        </header>
      </div>
    </section>
  );
};

export default Hero;
