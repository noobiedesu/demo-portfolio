import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkillsTools = () => {
  const coreSkills = [
    'SEO',
    'Content Strategy', 
    'Local SEO',
    'CRO',
    'CRM & Automation',
    'Google Ads',
    'Analytics & Reporting'
  ];

  const tools = [
    'Google Analytics (GA)',
    'Google Search Console (GSC)', 
    'Ahrefs',
    'SEMrush',
    'WordPress',
    'Zoho CRM',
    'Getfly',
    'Google Ads'
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-mono">
          💡 Skills & Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Core Skills */}
          <Card className="pixel-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-mono text-center">Core Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {coreSkills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-sm px-3 py-1 font-mono"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tools */}
          <Card className="pixel-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-mono text-center">Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {tools.map((tool, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-sm px-3 py-1 font-mono"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsTools;