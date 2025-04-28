
import React, { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Code, Search, Mail, Image, Book, Calendar } from 'lucide-react';

interface Skill {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  {
    id: 1,
    title: "SEO Analysis",
    description: "Technical audits and keyword strategy to improve organic visibility.",
    icon: Search
  },
  {
    id: 2,
    title: "Email Automation",
    description: "Creating personalized email flows with custom-built automation tools.",
    icon: Mail
  },
  {
    id: 3,
    title: "React Development",
    description: "Building interactive UIs and single-page applications for marketing sites.",
    icon: Code
  },
  {
    id: 4,
    title: "Content Strategy",
    description: "Data-driven content planning across multiple digital channels.",
    icon: Book
  },
  {
    id: 5,
    title: "Campaign Analytics",
    description: "Custom reporting dashboards to track marketing performance.",
    icon: Calendar
  },
  {
    id: 6,
    title: "Creative Direction",
    description: "Visual storytelling and brand identity development.",
    icon: Image
  }
];

const Skills = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.skill-card');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-[bounce_0.5s_ease-out]');
              el.classList.remove('opacity-0');
              el.classList.remove('translate-y-10');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) observer.observe(skillsSection);

    return () => {
      if (skillsSection) observer.unobserve(skillsSection);
    };
  }, []);

  return (
    <section id="skills" className="section bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-[#1E90FF]/10 text-[#1E90FF] border-[#1E90FF]/20 mb-4">Skillset</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services & Expertise</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Combining technical development skills with marketing expertise to deliver comprehensive digital solutions.
          </p>
        </div>
        
        <div className="skills-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="skill-card opacity-0 translate-y-10 transition-all duration-500"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF] text-white mx-auto mb-4">
                  <skill.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
