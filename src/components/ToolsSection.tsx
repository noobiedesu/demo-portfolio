import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toolsData } from '@/data/tools.data';

const ToolsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Tool descriptions/usage tooltips
  const toolDescriptions: Record<string, string> = {
    'Google Analytics': 'Track website traffic, user behavior, and conversion metrics',
    'Google Search Console': 'Monitor search performance, indexing, and technical SEO issues',
    'Ahrefs': 'Comprehensive SEO analysis, backlink research, and keyword tracking',
    'SEMrush': 'Competitive research, keyword analysis, and PPC campaign management',
    'Surfer SEO': 'Content optimization based on SERP analysis and NLP',
    'Screaming Frog': 'Technical SEO auditing and website crawling analysis',
    'Hotjar': 'User behavior analytics through heatmaps and session recordings',
    'WordPress': 'Content management system for building and managing websites',
    'Zoho CRM': 'Customer relationship management and sales pipeline tracking',
    'Getfly': 'Email marketing automation and lead nurturing campaigns',
    'Google Ads': 'Pay-per-click advertising and campaign optimization',
    'ChatGPT': 'AI-powered content creation and strategy development',
    'Perplexity': 'AI research assistant for market analysis and insights',
    'Claude': 'Advanced AI for content strategy and technical documentation',
    'Lovable': 'AI-powered web development and rapid prototyping'
  };

  // Get all categories plus "All"
  const categories = ['All', ...Object.keys(toolsData)];

  // Get filtered tools
  const getFilteredTools = () => {
    if (activeFilter === 'All') {
      return Object.entries(toolsData).flatMap(([category, tools]) => 
        tools.map(tool => ({ tool, category }))
      );
    }
    return toolsData[activeFilter as keyof typeof toolsData]?.map(tool => ({ 
      tool, 
      category: activeFilter 
    })) || [];
  };

  const filteredTools = getFilteredTools();

  return (
    <TooltipProvider delayDuration={300}>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="pixel-title text-center mb-8">
            🛠️ Tools & Platforms
          </h2>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`
                  px-4 py-2 rounded-[10px] border-2 font-mono text-sm font-medium
                  transition-all duration-300 ease-out
                  ${activeFilter === category
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                    : 'bg-background/80 text-foreground border-primary/30 hover:border-primary/50 hover:bg-primary/10'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map(({ tool, category }, index) => (
                <Tooltip key={`${tool}-${index}`}>
                  <TooltipTrigger asChild>
                    <div className="stagger-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <Badge
                        variant="outline"
                        className={`
                          w-full p-3 h-auto min-h-[3rem] flex items-center justify-center text-center
                          border-2 border-primary/30 rounded-[10px] bg-background/80 backdrop-blur-sm
                          font-mono text-sm font-medium cursor-pointer
                          hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-500/10
                          hover:border-pink-500/50 hover:shadow-lg hover:shadow-primary/25
                          transition-all duration-300 ease-out
                          neon-glow-hover
                        `}
                      >
                        <span className="line-clamp-2">{tool}</span>
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="max-w-xs p-3 bg-background/95 backdrop-blur-sm border-2 border-primary/30 rounded-[10px]"
                  >
                    <p className="font-mono text-xs">{toolDescriptions[tool] || `${tool} - Professional tool for ${category.toLowerCase()}`}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 px-1 snap-x snap-mandatory hide-scrollbar">
                {filteredTools.map(({ tool, category }, index) => (
                  <Tooltip key={`${tool}-${index}`}>
                    <TooltipTrigger asChild>
                      <div className="flex-shrink-0 snap-center">
                        <Badge
                          variant="outline"
                          className={`
                            w-32 h-20 flex items-center justify-center text-center p-2
                            border-2 border-primary/30 rounded-[10px] bg-background/80 backdrop-blur-sm
                            font-mono text-xs font-medium cursor-pointer
                            hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-500/10
                            hover:border-pink-500/50 hover:shadow-lg hover:shadow-primary/25
                            transition-all duration-300 ease-out
                            neon-glow-hover
                          `}
                        >
                          <span className="line-clamp-3 leading-tight">{tool}</span>
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="max-w-xs p-3 bg-background/95 backdrop-blur-sm border-2 border-primary/30 rounded-[10px]"
                    >
                      <p className="font-mono text-xs">{toolDescriptions[tool] || `${tool} - Professional tool for ${category.toLowerCase()}`}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              
              {/* Mobile scroll hint */}
              <div className="text-center mt-4">
                <p className="text-xs text-muted-foreground font-mono">← Swipe to explore tools →</p>
              </div>
            </div>
          </div>

          {/* Tools count */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground font-mono">
              Showing {filteredTools.length} tools
              {activeFilter !== 'All' && (
                <span className="text-primary"> in {activeFilter}</span>
              )}
            </p>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default ToolsSection;