import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, addTask, updateTask, deleteTask, moveTask, Task, TaskStatus, selectFilteredTasks, selectLoading } from '@/store/taskSlice';
import { TaskColumn } from './TaskColumn';
import { TaskForm } from './TaskForm';
import { DndContext, DragEndEvent, DragStartEvent, DragCancelEvent, closestCorners, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { createTask, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI, getTasks } from '@/api/mockTasks';
import { toast } from '@/hooks/use-toast';
import { AppDispatch, RootState, store } from '@/store';

const COLUMNS = [
  { status: 'todo' as TaskStatus, title: 'To Do' },
  { status: 'in-progress' as TaskStatus, title: 'In Progress' },
  { status: 'done' as TaskStatus, title: 'Done' },
];

export function TaskBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const filteredTasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectLoading);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await getTasks();
      dispatch(setTasks(tasks));
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load tasks', variant: 'destructive' });
    }
  };

  const openForm = (task: Task | null = null) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTaskAPI(taskId);
      dispatch(deleteTask(taskId));
      toast({ title: 'Success', description: 'Task deleted' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete task', variant: 'destructive' });
    }
  };

  const handleSubmit = async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingTask) {
        const updated = await updateTaskAPI(editingTask.id, data);
        dispatch(updateTask(updated));
        toast({ title: 'Success', description: 'Task updated' });
      } else {
        const created = await createTask(data);
        dispatch(addTask(created));
        toast({ title: 'Success', description: 'Task created' });
      }
      closeForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save task', variant: 'destructive' });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleMoveTask = async (taskId: string, newStatus: TaskStatus) => {
    const allTasks = store.getState().tasks.items as Task[];
    const task = allTasks.find(t => t.id === taskId);

    if (!task || task.status === newStatus) return;

    try {
      dispatch(moveTask({ taskId, newStatus }));
      await updateTaskAPI(taskId, { status: newStatus });
      const statusLabel = COLUMNS.find(s => s.status === newStatus)?.title;
      toast({ title: 'Success', description: `Task moved to ${statusLabel}` });
    } catch (error) {
      loadTasks();
      toast({ title: 'Error', description: 'Failed to move task', variant: 'destructive' });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id.toString();
    const allTasks = store.getState().tasks.items as Task[];
    const task = allTasks.find(t => t.id === taskId);

    if (!task) return;

    // Check if dropped on a column (status) or on another task
    let newStatus: TaskStatus;
    const overId = over.id.toString();
    
    // Check if over.id is a valid status (column)
    if (COLUMNS.some(col => col.status === overId)) {
      newStatus = overId as TaskStatus;
    } else {
      // If dropped on another task, find which column that task belongs to
      const targetTask = allTasks.find(t => t.id === overId);
      if (targetTask) {
        newStatus = targetTask.status;
      } else {
        return; // Invalid drop target
      }
    }

    await handleMoveTask(taskId, newStatus);
  };

  const tasksByStatus = COLUMNS.map(({ status }) => ({
    status,
    tasks: filteredTasks.filter(t => t.status === status),
  }));

  if (loading && filteredTasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart} 
        onDragCancel={() => setActiveId(null)} 
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
          {tasksByStatus.map(({ status, tasks }) => (
            <TaskColumn
              key={status}
              status={status}
              title={COLUMNS.find(c => c.status === status)?.title || ''}
              tasks={tasks}
              onEdit={openForm}
              onDelete={handleDelete}
              onAddTask={() => openForm(null)}
              onMoveTask={handleMoveTask}
              showAddButton={status === 'todo'}
            />
          ))}
        </div>
      </DndContext>

      <TaskForm isOpen={isFormOpen} task={editingTask} onClose={closeForm} onSubmit={handleSubmit} />
    </>
  );
}
