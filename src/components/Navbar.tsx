
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

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
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-lg font-bold font-mono pixel-button">
          Duyen<span className="text-accent">.</span>dev
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-foreground my-1.5 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <a href="#home" className="text-sm font-mono hover:text-accent transition-colors pixel-animate">Home</a>
          <a href="#projects" className="text-sm font-mono hover:text-accent transition-colors pixel-animate">Work</a>
          <a href="#about" className="text-sm font-mono hover:text-accent transition-colors pixel-animate">About</a>
          <a href="#contact" className="text-sm font-mono hover:text-accent transition-colors pixel-animate">Contact</a>
          <ThemeToggle />
          <Button asChild className="pixel-button">
            <a href="#contact">Hire Me</a>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 bg-background flex flex-col justify-center items-center p-4 transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
        >
          <nav className="flex flex-col space-y-6 items-center">
            <a 
              href="#home" 
              className="text-xl font-mono hover:text-accent transition-colors pixel-animate" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#projects" 
              className="text-xl font-mono hover:text-accent transition-colors pixel-animate" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </a>
            <a 
              href="#about" 
              className="text-xl font-mono hover:text-accent transition-colors pixel-animate" 
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-xl font-mono hover:text-accent transition-colors pixel-animate" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-4">
              <ThemeToggle />
            </div>
            <Button 
              asChild 
              className="pixel-button w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
