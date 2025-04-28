
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
        <a href="#" className="text-xl font-bold text-brand-gray">
          Portfolio<span className="text-brand-purple">.</span>
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> :
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-sm font-medium hover:text-brand-purple transition-colors">Home</a>
          <a href="#projects" className="text-sm font-medium hover:text-brand-purple transition-colors">Projects</a>
          <a href="#about" className="text-sm font-medium hover:text-brand-purple transition-colors">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-brand-purple transition-colors">Contact</a>
          <Button asChild>
            <a href="#contact" className="bg-brand-purple hover:bg-brand-purple/90">Let's Talk</a>
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 animate-fade-in">
            <a href="#home" className="text-sm font-medium hover:text-brand-purple transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#projects" className="text-sm font-medium hover:text-brand-purple transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#about" className="text-sm font-medium hover:text-brand-purple transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="text-sm font-medium hover:text-brand-purple transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <Button asChild className="w-full bg-brand-purple hover:bg-brand-purple/90">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Let's Talk</a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
