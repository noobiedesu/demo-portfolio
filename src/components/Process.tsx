import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Target, Pencil, PlayCircle, RefreshCcw } from 'lucide-react';

interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  uniqueApproach: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: 1,
    title: 'Discover',
    description: 'Research, analytics, voice of customer',
    icon: Search,
    uniqueApproach: 'I combine quantitative data with qualitative insights, using advanced analytics tools and direct customer interviews to uncover hidden opportunities that competitors miss.'
  },
  {
    id: 'define',
    number: 2,
    title: 'Define',
    description: 'Pinpoint problems, set KPIs',
    icon: Target,
    uniqueApproach: 'I create crystal-clear problem statements with SMART KPIs that align business goals with user needs, ensuring every metric drives meaningful action.'
  },
  {
    id: 'design',
    number: 3,
    title: 'Design',
    description: 'Map journeys, content, and hypotheses',
    icon: Pencil,
    uniqueApproach: 'I craft data-driven user journeys with hypothesis-led content strategies, mapping every touchpoint to maximize conversion potential.'
  },
  {
    id: 'deliver',
    number: 4,
    title: 'Deliver',
    description: 'Execute campaigns, automation, A/B tests',
    icon: PlayCircle,
    uniqueApproach: 'I build scalable automation systems with continuous A/B testing frameworks, ensuring campaigns adapt and optimize in real-time.'
  },
  {
    id: 'debrief',
    number: 5,
    title: 'Debrief',
    description: 'Measure, capture learnings, iterate',
    icon: RefreshCcw,
    uniqueApproach: 'I create comprehensive learning repositories that capture both wins and failures, turning every campaign into actionable insights for future optimization.'
  }
];

const Process = () => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <section className="section py-16 md:py-24 bg-gradient-to-br from-background via-background/80 to-primary/5 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'pixelScan 20s linear infinite'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="pixel-button bg-accent/20 text-accent border-accent/20 mb-4 font-mono">
            My Process
          </Badge>
          <h2 className="pixel-title text-2xl md:text-3xl font-bold mb-4 font-mono">
            ⚡ 5-Step Marketing Workflow
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            A systematic approach to creating data-driven marketing campaigns that deliver measurable results
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Animated connector line */}
            <div className="absolute top-24 left-8 right-8 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full opacity-60">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]" />
            </div>

            <div className="grid grid-cols-5 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <div key={step.id} className="text-center">
                  <Card 
                    className={`pixel-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-2 border-2 border-primary/30 bg-background/80 backdrop-blur-sm ${
                      expandedStep === step.id ? 'border-accent shadow-accent/25' : ''
                    }`}
                    onClick={() => toggleStep(step.id)}
                  >
                    <CardContent className="p-6">
                      {/* Step Number Circle */}
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center font-mono font-bold text-white text-lg animate-pixelGlow">
                        {step.number}
                      </div>
                      
                      {/* Icon */}
                      <step.icon className="w-8 h-8 mx-auto mb-3 text-primary animate-pixelPulse" />
                      
                      {/* Title & Description */}
                      <h3 className="font-mono font-bold text-lg mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                        {step.description}
                      </p>

                      {/* Expanded Content */}
                      {expandedStep === step.id && (
                        <div className="mt-4 pt-4 border-t border-primary/20 animate-fade-in">
                          <h4 className="font-mono font-semibold text-accent mb-2 text-sm">
                            💡 My Unique Approach
                          </h4>
                          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                            {step.uniqueApproach}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-6">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-6 top-20 w-1 h-12 bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 rounded-full opacity-60 animate-pixelGlow" />
              )}
              
              <Card 
                className={`pixel-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 border-2 border-primary/30 bg-background/80 backdrop-blur-sm ${
                  expandedStep === step.id ? 'border-accent shadow-accent/25' : ''
                }`}
                onClick={() => toggleStep(step.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Step Number Circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center font-mono font-bold text-white flex-shrink-0 animate-pixelGlow">
                      {step.number}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <step.icon className="w-6 h-6 text-primary animate-pixelPulse" />
                        <h3 className="font-mono font-bold text-lg text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono leading-relaxed mb-3">
                        {step.description}
                      </p>

                      {/* Expanded Content - Mobile Accordion */}
                      {expandedStep === step.id && (
                        <div className="mt-4 pt-4 border-t border-primary/20 animate-fade-in">
                          <h4 className="font-mono font-semibold text-accent mb-2 text-sm">
                            💡 My Unique Approach
                          </h4>
                          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                            {step.uniqueApproach}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground font-mono mb-4">
            Ready to see this process in action?
          </p>
          <button className="pixel-button bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-6 py-3 font-mono font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
            Let's Get Started ⚡
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;