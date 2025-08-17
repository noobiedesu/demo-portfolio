import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Zap, RotateCcw } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setFlipped(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });

  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("active")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".case-study-reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
      ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  return (
    <section id="case-studies" className="py-10 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <Badge className="pixel-button bg-accent/20 text-accent border-accent/20 mb-3 font-mono">
            Case Studies
          </Badge>
          <h2 className="text-xl md:text-3xl font-bold mb-2 font-mono">Real Results, Real Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-xs md:text-sm">
            Strategic marketing initiatives that drove measurable outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {caseStudies.map(study => {
            const isFlipped = flipped.has(study.id);
            return (
              <div key={study.id} className="case-study-reveal">
                <div
                  className={`flip-card group relative w-full aspect-[4/5] sm:aspect-[3/4] ${isFlipped ? "flipped" : ""}`}
                  onClick={() => toggle(study.id)}
                  role="button"
                  aria-label={`Toggle ${study.title}`}
                >
                  <div className="flip-card-inner absolute inset-0">

                    {/* FRONT */}
                    <div className="flip-face absolute inset-0">
                      <Card className="h-full w-full pixel-card bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/30 overflow-hidden">
                        <div className="relative w-full aspect-video overflow-hidden">
                          <img
                            src={study.image}
                            alt={study.title}
                            className="w-full h-full object-cover pixel-image"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                          <Badge variant="outline" className="absolute top-2 right-2 text-[10px] sm:text-xs bg-background/80">
                            {study.period}
                          </Badge>
                        </div>

                        <CardHeader className="pb-1 pt-3 px-3">
                          <CardTitle className="font-mono text-base md:text-lg leading-snug line-clamp-2">
                            {study.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="px-3 pt-1">
                          <p className="text-[11px] md:text-xs text-muted-foreground font-mono mb-2">
                            Skills Used:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {study.skills.slice(0, 4).map((s: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-[10px] md:text-xs px-2 py-0.5">
                                #{s}
                              </Badge>
                            ))}
                            {study.skills.length > 4 && (
                              <Badge variant="outline" className="text-[10px] md:text-xs px-2 py-0.5">
                                +{study.skills.length - 4}
                              </Badge>
                            )}
                          </div>

                          <p className="mt-3 text-[10px] md:text-xs text-muted-foreground font-mono flex items-center gap-1">
                            <RotateCcw className="w-3 h-3 shrink-0" />
                            Tap/Click to flip
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* BACK */}
                    <div className="flip-face absolute inset-0 [transform:rotateY(180deg)]">
                      <Card className="h-full w-full pixel-card bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 border-2 border-accent/30">
                        <CardHeader className="pb-2 px-3 pt-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px] sm:text-xs">
                              {study.period}
                            </Badge>
                            <RotateCcw className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <CardTitle className="text-[13px] md:text-sm font-mono leading-snug line-clamp-2">
                            {study.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="px-3 pb-3 space-y-3 overflow-y-auto">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <Target className="w-3 h-3 text-destructive shrink-0" />
                              <span className="font-semibold text-foreground text-xs">Problem</span>
                            </div>
                            <p className="text-muted-foreground text-[11px] leading-5 line-clamp-3">
                              {study.problem}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <Zap className="w-3 h-3 text-yellow-500 shrink-0" />
                              <span className="font-semibold text-foreground text-xs">Actions</span>
                            </div>
                            <ul className="space-y-1">
                              {study.actions.slice(0, 2).map((a: string, i: number) => (
                                <li key={i} className="text-muted-foreground text-[11px] leading-5 flex gap-1">
                                  <span className="text-accent mt-1">•</span>
                                  <span className="line-clamp-2">{a}</span>
                                </li>
                              ))}
                              {study.actions.length > 2 && (
                                <li className="text-muted-foreground text-[11px]">+{study.actions.length - 2} more…</li>
                              )}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                              <span className="font-semibold text-foreground text-xs">Results</span>
                            </div>
                            <ul className="space-y-1">
                              {study.results.slice(0, 3).map((r: string, i: number) => (
                                <li key={i} className="text-muted-foreground text-[11px] leading-5 flex gap-1">
                                  <span className="text-primary mt-1">✓</span>
                                  <span className="line-clamp-2">{r}</span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;