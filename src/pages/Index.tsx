
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
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
        } else {
          entry.target.classList.remove('active');
          entry.target.classList.add('inactive');
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
      
      <div className="reveal">
        <Projects />
      </div>
      
      <div className="reveal">
        <About />
      </div>
      
      <div className="reveal">
        <Contact />
      </div>
    </Layout>
  );
};

export default Index;
