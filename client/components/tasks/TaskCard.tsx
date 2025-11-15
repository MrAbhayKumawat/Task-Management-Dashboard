import { Task, TaskStatus } from '@/store/taskSlice';
import { useDraggable } from '@dnd-kit/core';
import { Trash2, Edit2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
}

const priorityBadge = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function TaskCard({ task, onEdit, onDelete, onMoveTask }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const getAvailableStatuses = (): TaskStatus[] => {
    if (task.status === 'todo') return ['in-progress', 'done'];
    if (task.status === 'in-progress') return ['done'];
    return [];
  };

  const availableStatuses = getAvailableStatuses();

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4',
        'cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md',
        isDragging && 'opacity-50 shadow-lg'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-2 mb-2">
        <h3 className="flex-1 font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
          {task.title}
        </h3>
        <div className="flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => handleButtonClick(e, () => onEdit(task))}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Edit2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={(e) => handleButtonClick(e, () => onDelete(task.id))}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex gap-2 flex-wrap items-center">
        <span className={cn('text-xs px-2 py-1 rounded-full font-medium', priorityBadge[task.priority])}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {task.dueDate && (
          <span className={cn('text-xs px-2 py-1 rounded-full',
            isOverdue
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'
          )}>
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>

      {/* Mobile action buttons - only show on mobile */}
      {availableStatuses.length > 0 && (
        <div className="flex gap-2 mt-3 md:hidden">
          {availableStatuses.includes('in-progress') && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onMoveTask(task.id, 'in-progress');
              }}
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              In Progress
            </Button>
          )}
          {availableStatuses.includes('done') && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onMoveTask(task.id, 'done');
              }}
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Done
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
