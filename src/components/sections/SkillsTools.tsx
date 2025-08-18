import React from "react";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/data/tools";

const skills = [
  "SEO", "Content Strategy", "Local SEO", "CRO",
  "CRM & Automation", "Google Ads", "Analytics & Reporting",
];

export default function SkillsTools() {
  return (
    <section id="skills-tools" className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-mono font-bold text-xl md:text-3xl">💡 Skills &amp; Tools</h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-2">
            The capabilities and stack I use to turn insight into impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Skills (badges) */}
          <div>
            <h3 className="font-mono font-semibold text-base md:text-lg mb-3">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} variant="secondary" className="px-3 py-1 text-xs md:text-sm">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tools (logos) */}
          <div>
            <h3 className="font-mono font-semibold text-base md:text-lg mb-3">Tools</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {tools.map((t) => (
                <div
                  key={t.name}
                  className="aspect-square rounded-lg bg-background/40 border border-border/50 flex items-center justify-center p-3"
                  title={t.name}
                >
                  <img
                    src={t.src}
                    alt={t.alt ?? t.name}
                    className="max-w-full max-h-full object-contain grayscale opacity-90 hover:opacity-100 transition"
                    loading="lazy"
                    width={64}
                    height={64}
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] md:text-xs text-muted-foreground">
              *Logos normalized to square artboards for visual consistency; loaded lazily for mobile performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}