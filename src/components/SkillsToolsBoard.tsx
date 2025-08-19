import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`pixel-badge select-none touch-none ${isDragging ? 'animate-pulse' : ''}`}
      aria-label={`Draggable item ${children}`}
    >
      {children}
    </div>
  );
};

const SkillsToolsBoard: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([
    "SEO & Content Strategy",
    "Local SEO",
    "CRO (Conversion Rate Optimization)",
    "Google Ads (Performance)",
    "CRM & Email Automation",
    "Analytics & Reporting"
  ]);

  const [tools, setTools] = useState<string[]>([
    "Google Analytics",
    "Google Search Console",
    "Ahrefs",
    "SEMrush",
    "Surfer SEO",
    "WordPress",
    "Zoho CRM",
    "Getfly",
    "Google Ads",
    "ChatGPT",
    "Perplexity",
    "Claude",
    "Gemini",
    "Lovable"
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load from localStorage on mount
  useEffect(() => {
    const savedSkills = localStorage.getItem('skillsOrder');
    const savedTools = localStorage.getItem('toolsOrder');
    
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
    if (savedTools) {
      setTools(JSON.parse(savedTools));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('skillsOrder', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('toolsOrder', JSON.stringify(tools));
  }, [tools]);

  const handleSkillsDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToolsDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTools((items) => {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-4 h-4 bg-primary animate-ping"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-accent animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-secondary animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-primary animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="pixel-title text-3xl md:text-4xl font-bold mb-4">
            🎮 Skills & Tools Board
          </h2>
          <p className="text-muted-foreground font-mono text-sm bg-muted/30 inline-block px-4 py-2 border border-border/50">
            &gt; Drag and drop to reorder by priority • Changes saved automatically &lt;
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Skills Section */}
          <div className="pixel-section p-6">
            <h3 className="text-xl font-mono font-bold text-center mb-6 pixel-title relative">
              ⚡ Core Skills
            </h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSkillsDragEnd}
            >
              <SortableContext items={skills} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                  {skills.map((skill, index) => (
                    <div key={skill} style={{ animationDelay: `${index * 0.05}s` }}>
                      <DraggableItem id={skill}>
                        {skill}
                      </DraggableItem>
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Tools Section */}
          <div className="pixel-section p-6">
            <h3 className="text-xl font-mono font-bold text-center mb-6 pixel-title relative">
              🛠️ Essential Tools
            </h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleToolsDragEnd}
            >
              <SortableContext items={tools} strategy={verticalListSortingStrategy}>
                {/* Mobile: horizontal scroll */}
                <div className="lg:hidden">
                  <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {tools.map((tool, index) => (
                      <div key={tool} className="flex-shrink-0 snap-start" style={{ animationDelay: `${index * 0.1}s` }}>
                        <DraggableItem id={tool}>
                          {tool}
                        </DraggableItem>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Desktop: vertical list */}
                <div className="hidden lg:flex flex-col gap-3">
                  {tools.map((tool, index) => (
                    <div key={tool} style={{ animationDelay: `${index * 0.05}s` }}>
                      <DraggableItem id={tool}>
                        {tool}
                      </DraggableItem>
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsToolsBoard;