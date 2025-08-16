import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, Zap } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';

const CaseStudies = () => {
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
              <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{study.period}</Badge>
                  </div>
                  <CardTitle className="text-lg font-mono leading-tight">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-semibold text-foreground">Problem</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{study.problem}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-foreground">Actions</span>
                    </div>
                    <ul className="space-y-1">
                      {study.actions.map((action, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-1">
                          <span className="text-accent mt-1">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-foreground">Results</span>
                    </div>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-1">
                          <span className="text-primary mt-1">✓</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;