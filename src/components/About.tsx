
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const About = () => {
  const skills = [
    "Brand Strategy", "Content Marketing", "Social Media", "SEO", "PPC", 
    "Email Marketing", "Market Research", "Data Analysis", "Campaign Management", 
    "Lead Generation", "Conversion Optimization", "Copywriting"
  ];

  return (
    <section id="about" className="section">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-brand-purple/10 text-brand-purple border-none mb-4">About Me</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Passionate About Creating Impactful Marketing Strategies</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                With over 10 years of experience in digital marketing and brand development, I specialize in creating 
                data-driven strategies that connect brands with their target audiences and drive measurable results.
              </p>
              <p>
                My approach combines creative thinking with analytical precision, ensuring that every campaign 
                not only looks great but also delivers on key performance indicators.
              </p>
              <p>
                I've had the privilege of working with brands across various industries, from tech startups to 
                established retail chains, helping them achieve their marketing objectives and grow their business.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild className="btn-gradient">
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-4">My Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} className="bg-brand-purple/5 text-brand-purple border-brand-purple/20 py-1.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-4">Experience Highlights</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-brand-gray font-medium">Marketing Director</h4>
                  <p className="text-sm text-gray-500">ABC Agency • 2020 - Present</p>
                </div>
                <div>
                  <h4 className="text-brand-gray font-medium">Senior Marketing Strategist</h4>
                  <p className="text-sm text-gray-500">XYZ Creative • 2017 - 2020</p>
                </div>
                <div>
                  <h4 className="text-brand-gray font-medium">Digital Marketing Specialist</h4>
                  <p className="text-sm text-gray-500">123 Digital • 2014 - 2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
