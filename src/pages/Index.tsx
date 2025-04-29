
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

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
      
      <div className="md:px-4 px-2">
        <Timeline />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <About />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <Skills />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <Projects />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <Testimonials />
      </div>
      
      <div className="reveal px-4 md:px-0">
        <Contact />
      </div>
    </Layout>
  );
};

export default Index;
