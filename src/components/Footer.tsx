
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-gray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio<span className="text-brand-purple">.</span></h3>
            <p className="text-sm text-gray-300 max-w-xs">
              Creating compelling marketing strategies that connect brands with their audiences and deliver measurable outcomes.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-sm text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#projects" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Contact</h4>
            <address className="not-italic text-sm text-gray-300">
              <p className="mb-2">San Francisco, CA</p>
              <p className="mb-2">hello@yourportfolio.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Your Portfolio. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
