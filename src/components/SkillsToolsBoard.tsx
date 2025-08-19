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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pixel-badge select-none touch-none"
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
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-mono">
          💡 Skills & Tools Board
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-mono text-sm">
          Drag and drop to reorder by priority • Changes saved automatically
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-mono font-semibold text-center mb-6">
              Core Skills
            </h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSkillsDragEnd}
            >
              <SortableContext items={skills} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                  {skills.map((skill) => (
                    <DraggableItem key={skill} id={skill}>
                      {skill}
                    </DraggableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-mono font-semibold text-center mb-6">
              Essential Tools
            </h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleToolsDragEnd}
            >
              <SortableContext items={tools} strategy={verticalListSortingStrategy}>
                {/* Mobile: horizontal scroll */}
                <div className="lg:hidden">
                  <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {tools.map((tool) => (
                      <div key={tool} className="flex-shrink-0 snap-start">
                        <DraggableItem id={tool}>
                          {tool}
                        </DraggableItem>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Desktop: vertical list */}
                <div className="hidden lg:flex flex-col gap-3">
                  {tools.map((tool) => (
                    <DraggableItem key={tool} id={tool}>
                      {tool}
                    </DraggableItem>
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