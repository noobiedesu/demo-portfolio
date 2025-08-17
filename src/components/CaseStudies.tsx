import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, Zap, RotateCcw } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';

const CaseStudies = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.remove('inactive');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.case-study-reveal');
    revealElements.forEach((element, index) => {
      element.classList.add('inactive');
      (element as HTMLElement).style.transitionDelay = `${index * 0.2}s`;
      observer.observe(element);
    });

    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="case-studies" className="section py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="pixel-button bg-accent/20 text-accent border-accent/20 mb-4 font-mono">Case Studies</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono">Real Results, Real Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm">
            Strategic marketing initiatives that drove measurable business outcomes
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div key={study.id} className="case-study-reveal reveal">
              <div className="flip-card h-80 cursor-pointer" onClick={() => toggleCard(study.id)}>
                <div className={`flip-card-inner ${flippedCards.has(study.id) ? 'flipped' : ''}`}>
                  {/* Front of card */}
                  <div className="flip-card-front">
                    <Card className="h-full pixel-card bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/30 overflow-hidden">
                      <div className="relative h-24 sm:h-28 md:h-32 overflow-hidden">
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="w-full h-full object-cover pixel-image"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-xs pixel-button bg-background/80">{study.period}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-mono leading-tight text-center">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-center mb-4">
                          <p className="text-sm text-muted-foreground font-mono mb-3">Skills Used:</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {study.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs pixel-button">
                                #{skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground font-mono flex items-center justify-center gap-2">
                            <RotateCcw className="w-3 h-3" />
                            Click to flip for details
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back">
                    <Card className="h-full pixel-card bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 border-2 border-accent/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs pixel-button">{study.period}</Badge>
                          <RotateCcw className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-sm font-mono leading-tight">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-xs">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Target className="w-3 h-3 text-destructive" />
                            <span className="font-semibold text-foreground">Problem</span>
                          </div>
                          <p className="text-muted-foreground text-xs">{study.problem}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span className="font-semibold text-foreground">Actions</span>
                          </div>
                          <ul className="space-y-0.5">
                            {study.actions.slice(0, 2).map((action, idx) => (
                              <li key={idx} className="text-muted-foreground flex items-start gap-1 text-xs">
                                <span className="text-accent mt-0.5">•</span>
                                {action}
                              </li>
                            ))}
                            {study.actions.length > 2 && (
                              <li className="text-muted-foreground text-xs">+{study.actions.length - 2} more...</li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="font-semibold text-foreground">Results</span>
                          </div>
                          <ul className="space-y-0.5">
                            {study.results.map((result, idx) => (
                              <li key={idx} className="text-muted-foreground flex items-start gap-1 text-xs">
                                <span className="text-primary mt-0.5">✓</span>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;