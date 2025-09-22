
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import SkillsGravity from '@/components/SkillsGravity';
import ToolsSection from '@/components/ToolsSection';


const Index = () => {
  // Reveal animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.remove('inactive');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
      element.classList.add('inactive');
      observer.observe(element);
    });

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <Layout>
      <Hero />
      
      <div className="reveal px-4 md:px-0">
        <CaseStudies />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <Process />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <SkillsGravity />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <ToolsSection />
      </div>
      
    </Layout>
  );
};

export default Index;
