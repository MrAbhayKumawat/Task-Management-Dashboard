import { Task, TaskStatus } from '@/store/taskSlice';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAddTask: () => void;
}

const statusConfig: Record<TaskStatus, { color: string; icon: string }> = {
  todo: { color: 'bg-slate-100 dark:bg-slate-900', icon: '📋' },
  'in-progress': { color: 'bg-blue-100 dark:bg-blue-900', icon: '⚙️' },
  done: { color: 'bg-green-100 dark:bg-green-900', icon: '✅' },
};

export function TaskColumn({ status, title, tasks, onEdit, onDelete, onAddTask }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });
  const { color, icon } = statusConfig[status];

  return (
    <div className={cn('rounded-lg flex flex-col h-full', color)}>
      <div className="p-4 border-b border-gray-300 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <span>{icon}</span>
          <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
          <span className="ml-auto bg-gray-300 dark:bg-slate-700 text-gray-900 dark:text-white rounded-full px-2.5 py-0.5 text-sm font-medium">
            {tasks.length}
          </span>
        </div>
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={onAddTask}>
          <Plus className="w-3 h-3 mr-1" />
          Add Task
        </Button>
      </div>

      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No tasks</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
