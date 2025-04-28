
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-0 w-80 h-80 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-blue/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Creative Marketing Solutions That <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue">Drive Results</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            I craft compelling marketing strategies that connect brands with their audiences and deliver measurable outcomes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="btn-gradient">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact" className="border-gray-300">Get In Touch</a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-brand-purple">50+</p>
              <p className="text-sm text-gray-500">Projects Completed</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-brand-purple">92%</p>
              <p className="text-sm text-gray-500">Client Satisfaction</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-brand-purple">10+</p>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-brand-purple">15+</p>
              <p className="text-sm text-gray-500">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
