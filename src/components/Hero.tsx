
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#FFC0CB]/30 to-[#1E90FF]/30 px-4 md:px-0">
      {/* Background elements */}
      <div className="absolute top-20 right-20 w-60 md:w-96 h-60 md:h-96 bg-[#FFC0CB]/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-60 md:w-96 h-60 md:h-96 bg-[#1E90FF]/20 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-[fade-in_1s_ease-out]">
            My Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF]">Journey</span>
          </h1>
          <p className="text-md md:text-lg lg:text-xl text-gray-700 mb-10 max-w-2xl mx-auto animate-[fade-in_1.2s_ease-out]">
            Where code meets creativity. I blend technical expertise with marketing strategy to create impactful digital experiences that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fade-in_1.4s_ease-out]">
            <Button asChild className="btn-gradient group">
              <a href="#timeline">
                Explore My Story
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </Button>
          </div>
          
          {/* Stats - mobile optimized */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-[fade-in_1.6s_ease-out]">
            <div className="p-3 md:p-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E90FF]">5+ yrs</p>
              <p className="text-xs md:text-sm text-gray-500">Full Stack Experience</p>
            </div>
            <div className="p-3 md:p-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E90FF]">95%</p>
              <p className="text-xs md:text-sm text-gray-500">Client Satisfaction</p>
            </div>
            <div className="p-3 md:p-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFC0CB]">50+</p>
              <p className="text-xs md:text-sm text-gray-500">Projects Completed</p>
            </div>
            <div className="p-3 md:p-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFC0CB]">12+</p>
              <p className="text-xs md:text-sm text-gray-500">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
