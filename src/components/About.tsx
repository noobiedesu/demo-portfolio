
import React, { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

const About = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right');
    fadeElements.forEach(el => observer.observe(el));

    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-left">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#FFC0CB] rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3" 
                alt="Marketing Professional" 
                className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[3/4]" 
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FFC0CB] to-[#1E90FF] rounded-lg"></div>
            </div>
          </div>
          
          <div className="fade-in-right">
            <Badge className="bg-[#FFC0CB]/10 text-[#FFC0CB] border-[#FFC0CB]/20 mb-4">About Me</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Blending Code & Creativity</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                I'm a full-stack marketer with over 5 years of experience bridging the gap between
                technical development and creative strategy. With expertise in both front-end/back-end development
                and comprehensive marketing strategy, I create integrated solutions that drive measurable results.
              </p>
              <p>
                My unique approach combines data-driven insights with creative storytelling, ensuring that
                every campaign is not only visually compelling but also technically optimized for performance.
              </p>
              <p>
                When I'm not coding or crafting marketing strategies, you'll find me exploring new technologies,
                contributing to open-source projects, or mentoring aspiring marketers on incorporating technical skills
                into their toolkit.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1E90FF]">Technical Skills</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• React & Next.js</li>
                  <li>• Node.js & Express</li>
                  <li>• Database Design</li>
                  <li>• API Development</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#FFC0CB]">Marketing Expertise</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Content Strategy</li>
                  <li>• Campaign Analytics</li>
                  <li>• SEO Optimization</li>
                  <li>• Email Marketing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
