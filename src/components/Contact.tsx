
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    // Reset form
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-[#FFC0CB]/30 to-[#1E90FF]/30 text-gray-700 border-none mb-4">Get in Touch</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Create Together</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can combine technical expertise with marketing strategy to achieve your goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 shadow-md">
            <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  required 
                  className="border-gray-300 focus:ring-[#1E90FF] focus:border-[#1E90FF]" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Your email" 
                  required 
                  className="border-gray-300 focus:ring-[#1E90FF] focus:border-[#1E90FF]" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  rows={5} 
                  required 
                  className="border-gray-300 focus:ring-[#1E90FF] focus:border-[#1E90FF]" 
                />
              </div>
              <Button type="submit" className="w-full btn-gradient">
                Send Message
              </Button>
            </form>
          </Card>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-[#FFC0CB]/30 to-[#1E90FF]/30 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Email</h4>
                    <p className="text-gray-800">hello@fullstackmarketer.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-[#FFC0CB]/30 to-[#1E90FF]/30 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <p className="text-gray-800">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-[#FFC0CB]/10 to-[#1E90FF]/10 p-3 rounded-full transition-transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-gray-700" />
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-[#FFC0CB]/10 to-[#1E90FF]/10 p-3 rounded-full transition-transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 text-gray-700" />
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-[#FFC0CB]/10 to-[#1E90FF]/10 p-3 rounded-full transition-transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6 text-gray-700" />
                </a>
                <a 
                  href="#" 
                  className="bg-gradient-to-r from-[#FFC0CB]/10 to-[#1E90FF]/10 p-3 rounded-full transition-transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
