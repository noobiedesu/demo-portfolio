
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import avatarImage from '@/assets/avatar.png';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20 px-4 md:px-0">
      {/* Pixel background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/30 pixel-card"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/30 pixel-card"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/20 pixel-card hidden md:block"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-8 flex justify-center">
            <img 
              src={avatarImage} 
              alt="Tran Thi Duyen - Digital Marketer"
              className="w-24 h-24 md:w-32 md:h-32 pixel-image pixel-card border-4 border-primary"
            />
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 animate-[fade-in_1s_ease-out]">
            Tran Thi Duyen — Digital Marketer who builds <span className="text-primary">momentum</span>, not <span className="text-accent">discounts</span>
          </h1>
          
          <p className="text-sm md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-[fade-in_1.2s_ease-out] font-mono">
            Pixel-perfect storytelling for brands that want to be remembered
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fade-in_1.4s_ease-out]">
            <Button asChild className="pixel-button text-lg px-8 py-4 group">
              <a href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </Button>
          </div>
          
          {/* Pixel Stats */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-[fade-in_1.6s_ease-out]">
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-2xl md:text-3xl font-bold text-primary font-mono">+250%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">Organic Growth</p>
            </div>
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-2xl md:text-3xl font-bold text-accent font-mono">70%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">Email Open Rate</p>
            </div>
            <div className="pixel-card p-4 md:p-6 bg-card">
              <p className="text-2xl md:text-3xl font-bold text-primary font-mono">45%</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono">CRO Improvement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
