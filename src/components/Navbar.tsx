
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold font-playfair">
          Full Stack<span className="text-[#FFC0CB]">.</span>Marketer
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-800 my-1.5 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-sm font-medium hover:text-[#FFC0CB] transition-colors">Home</a>
          <a href="#timeline" className="text-sm font-medium hover:text-[#FFC0CB] transition-colors">Journey</a>
          <a href="#about" className="text-sm font-medium hover:text-[#FFC0CB] transition-colors">About</a>
          <a href="#skills" className="text-sm font-medium hover:text-[#FFC0CB] transition-colors">Skills</a>
          <a href="#projects" className="text-sm font-medium hover:text-[#FFC0CB] transition-colors">Projects</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-[#FFC0CB] transition-colors">Testimonials</a>
          <Button asChild className="bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF] hover:from-[#FFC0CB]/90 hover:to-[#1E90FF]/90 text-white transition-all duration-300 hover:scale-105">
            <a href="#contact">Let's Talk</a>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 bg-white flex flex-col justify-center items-center p-4 transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
        >
          <nav className="flex flex-col space-y-6 items-center">
            <a 
              href="#home" 
              className="text-xl font-medium hover:text-[#FFC0CB] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#timeline" 
              className="text-xl font-medium hover:text-[#FFC0CB] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Journey
            </a>
            <a 
              href="#about" 
              className="text-xl font-medium hover:text-[#FFC0CB] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#skills" 
              className="text-xl font-medium hover:text-[#FFC0CB] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="text-xl font-medium hover:text-[#FFC0CB] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#testimonials" 
              className="text-xl font-medium hover:text-[#FFC0CB] transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button 
              asChild 
              className="bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF] hover:from-[#FFC0CB]/90 hover:to-[#1E90FF]/90 text-white w-full transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href="#contact">Let's Talk</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
