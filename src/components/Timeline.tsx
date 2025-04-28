
import React, { useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Code, Image, Mail, Book } from 'lucide-react';

interface TimelineMilestone {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const milestones: TimelineMilestone[] = [
  {
    id: 1,
    year: '2018',
    title: 'First Campaign',
    description: 'Managed my first digital marketing campaign, exceeding KPIs by 45%.',
    icon: Calendar
  },
  {
    id: 2,
    year: '2019',
    title: 'Built My First App',
    description: 'Created a React-based analytics dashboard for marketing performance tracking.',
    icon: Code
  },
  {
    id: 3,
    year: '2020',
    title: 'Agency Experience',
    description: 'Joined a creative agency to lead technical marketing initiatives.',
    icon: Image
  },
  {
    id: 4,
    year: '2021',
    title: 'Launched Brand X',
    description: 'Developed and executed full-stack marketing strategy for a startup.',
    icon: Book
  },
  {
    id: 5,
    year: '2022',
    title: 'Automation System',
    description: 'Built a custom marketing automation system using Node.js and React.',
    icon: Code
  },
  {
    id: 6,
    year: '2023',
    title: 'Freelance Journey',
    description: 'Started consulting for tech brands on integrated marketing strategies.',
    icon: Mail
  },
];

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const timelineElements = document.querySelectorAll('.timeline-reveal');
    timelineElements.forEach(el => observer.observe(el));

    return () => {
      timelineElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const scrollPosition = window.scrollY;
      const timelineContainer = timelineRef.current;
      const scrollOffset = scrollPosition * 0.1;
      
      // Create parallax effect
      timelineContainer.style.backgroundPositionX = `-${scrollOffset}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="timeline" 
      ref={timelineRef} 
      className="section bg-gradient-to-r from-[#FFC0CB]/10 to-[#1E90FF]/10 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-[#FFC0CB]/50 to-[#1E90FF]/50 text-gray-700 border-none mb-4">My Journey</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Marketing & Development Timeline</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A chronological journey through my career as a full-stack marketer, combining technical skills with creative strategy.
          </p>
        </div>
        
        {/* Scrollable timeline */}
        <div className="timeline-container">
          <div className="timeline pb-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="timeline-reveal timeline-card">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF] text-white mb-2">
                  <milestone.icon size={20} />
                </div>
                <span className="timeline-year">{milestone.year}</span>
                <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                <p className="text-sm text-gray-600 text-center">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
