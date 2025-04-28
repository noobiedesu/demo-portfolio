
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Full Stack<span className="text-[#FFC0CB]">.</span>Marketer</h3>
            <p className="text-sm text-gray-300 max-w-xs">
              Blending technical expertise with marketing strategy to create compelling digital experiences that drive measurable results.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-sm text-gray-300 hover:text-[#FFC0CB] transition-colors">Home</a>
              <a href="#timeline" className="text-sm text-gray-300 hover:text-[#FFC0CB] transition-colors">Journey</a>
              <a href="#about" className="text-sm text-gray-300 hover:text-[#FFC0CB] transition-colors">About</a>
              <a href="#skills" className="text-sm text-gray-300 hover:text-[#FFC0CB] transition-colors">Skills</a>
              <a href="#projects" className="text-sm text-gray-300 hover:text-[#FFC0CB] transition-colors">Projects</a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-[#FFC0CB] transition-colors">Contact</a>
            </nav>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">Contact</h4>
            <address className="not-italic text-sm text-gray-300">
              <p className="mb-2">San Francisco, CA</p>
              <p className="mb-2">hello@fullstackmarketer.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Full Stack Marketer. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFC0CB] transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFC0CB] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
