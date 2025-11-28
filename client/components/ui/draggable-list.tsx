"use client";

import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { ReactNode, useState } from "react";

interface DraggableItem {
  id: string;
}

interface DraggableListProps<T extends DraggableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number, dragHandleProps: DragHandleProps) => ReactNode;
  className?: string;
  itemClassName?: string;
  emptyState?: ReactNode;
  title?: string;
  gridCols?: 1 | 2 | 3;
}

export interface DragHandleProps {
  index: number;
  isDragging: boolean;
  isDragOver: boolean;
}

export function DraggableList<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  className,
  itemClassName,
  emptyState,
  title,
  gridCols = 1,
}: DraggableListProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    onReorder(newItems);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {title && (
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
          {title} ({items.length}) - Drag to reorder
        </h3>
      )}
      <div
        className={cn(
          gridCols === 3
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            : gridCols === 2
            ? "grid grid-cols-1 md:grid-cols-2 gap-3"
            : "space-y-3"
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "bg-white dark:bg-card rounded-lg border border-border p-4 group hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-grab active:cursor-grabbing",
              draggedIndex === index && "opacity-50 scale-[0.98]",
              dragOverIndex === index && "border-primary border-2 bg-primary/5",
              itemClassName
            )}
          >
            {renderItem(item, index, {
              index,
              isDragging: draggedIndex === index,
              isDragOver: dragOverIndex === index,
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Drag Handle component with index badge
interface DragHandleWithIndexProps {
  index: number;
  className?: string;
}

export function DragHandleWithIndex({ index, className }: DragHandleWithIndexProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 shrink-0", className)}>
      <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
      <span className="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded text-xs font-semibold text-slate-600 dark:text-slate-400">
        {index + 1}
      </span>
    </div>
  );
}
