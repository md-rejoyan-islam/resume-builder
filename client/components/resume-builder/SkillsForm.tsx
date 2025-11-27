"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

interface SkillsFormProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

// Generate a unique ID
const generateId = () => {
  return `skill-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export function SkillsForm({ skills, onSkillsChange }: SkillsFormProps) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(3);

  const handleAddSkill = () => {
    if (!skillName.trim()) return;

    // Check for duplicate skill (case-insensitive)
    const isDuplicate = skills.some(
      (skill) => skill.name.toLowerCase() === skillName.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.warning("This skill already exists!");
      return;
    }

    const newSkill: Skill = {
      id: generateId(),
      name: skillName.trim(),
      level: skillLevel,
    };

    onSkillsChange([...skills, newSkill]);
    setSkillName("");
    setSkillLevel(3);
  };

  const handleRemoveSkill = (id: string) => {
    onSkillsChange(skills.filter((skill) => skill.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Skill Form - Stacked rows */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Skill Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Skill Name
          </label>
          <Input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. JavaScript, Project Management, Communication"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Proficiency Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Proficiency Level
            </label>
            <span className="text-sm font-semibold text-primary">
              {levelLabels[skillLevel]}
            </span>
          </div>
          <div className="pt-2 pb-1">
            <Slider
              value={[skillLevel]}
              onValueChange={(value) => setSkillLevel(value[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 dark:text-muted-foreground">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Row 3: Add Button */}
        <Button
          type="button"
          onClick={handleAddSkill}
          disabled={!skillName.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            !skillName.trim() && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      {/* Skills List - Grid layout for compact display */}
      {skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Added Skills ({skills.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between bg-white dark:bg-card rounded-lg border border-border px-3 py-2.5 group hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-900 dark:text-foreground truncate">
                      {skill.name}
                    </span>
                  </div>
                  {/* Level indicator dots */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "w-4 h-1 rounded-full transition-colors",
                            level <= skill.level
                              ? "bg-primary"
                              : "bg-slate-200 dark:bg-slate-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-muted-foreground">
                      {levelLabels[skill.level]}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors ml-2 opacity-0 group-hover:opacity-100"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {skills.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <p className="text-sm">No skills added yet.</p>
          <p className="text-xs mt-1">Add your first skill above to get started.</p>
        </div>
      )}
    </div>
  );
}
