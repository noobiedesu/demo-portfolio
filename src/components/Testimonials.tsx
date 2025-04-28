
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "The unique combination of technical skills and marketing expertise made all the difference in our campaign. We saw a 40% increase in conversion rates thanks to the optimized landing pages and strategic content.",
    author: "Sarah Johnson",
    role: "CMO, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    text: "Working with a marketer who can also develop custom solutions saved us time and resources. The email automation system created for our company increased open rates by 25% and dramatically improved our lead nurturing process.",
    author: "Michael Chen",
    role: "Marketing Director, GrowthLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    text: "The data visualization dashboard built for our marketing team transformed how we make decisions. Having someone who understands both the technical requirements and marketing objectives is invaluable.",
    author: "Jessica Williams",
    role: "Digital Strategy Lead, Brand Forward",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section bg-gradient-to-br from-[#FFC0CB]/10 to-[#1E90FF]/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-[#FFC0CB]/10 text-[#FFC0CB] border-[#FFC0CB]/20 mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients have to say about working with a full-stack marketer.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="testimonial-card relative">
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 text-6xl text-[#FFC0CB]/30">"</div>
            <div className="absolute -bottom-5 -right-5 text-6xl text-[#1E90FF]/30">"</div>
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                  }`}
                >
                  <p className="text-lg text-center text-gray-700 mb-8">
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 mr-4 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  index === activeIndex ? 'bg-gradient-to-r from-[#FFC0CB] to-[#1E90FF]' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
