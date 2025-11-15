import { Task } from '@/store/taskSlice';

const DB_KEY = 'tasks-db';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Setup project structure',
    description: 'Initialize the React project with necessary configurations',
    status: 'done',
    priority: 'high',
    dueDate: '2024-01-15',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: '2',
    title: 'Design dashboard layout',
    description: 'Create wireframes and design mockups for the dashboard',
    status: 'done',
    priority: 'high',
    dueDate: '2024-01-18',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-13T10:20:00Z',
  },
  {
    id: '3',
    title: 'Implement task form',
    description: 'Build form component with validation',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-20',
    createdAt: '2024-01-11T09:00:00Z',
    updatedAt: '2024-01-14T11:45:00Z',
  },
  {
    id: '4',
    title: 'Setup authentication',
    description: 'Implement login and protected routes',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-22',
    createdAt: '2024-01-11T10:30:00Z',
    updatedAt: '2024-01-14T15:20:00Z',
  },
  {
    id: '5',
    title: 'Add drag and drop',
    description: 'Implement task movement between columns',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-01-25',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
  },
  {
    id: '6',
    title: 'Write unit tests',
    description: 'Add tests for core components and utilities',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-01-28',
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
  },
  {
    id: '7',
    title: 'Deploy to production',
    description: 'Deploy application to production servers',
    status: 'todo',
    priority: 'low',
    dueDate: '2024-02-01',
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
  },
];

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function getTasks(): Promise<Task[]> {
  await delay(300);
  const stored = localStorage.getItem(DB_KEY);
  return stored ? JSON.parse(stored) : (() => {
    localStorage.setItem(DB_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  })();
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  await delay(200);
  const tasks = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.unshift(newTask);
  localStorage.setItem(DB_KEY, JSON.stringify(tasks));
  return newTask;
}

export async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> {
  await delay(200);
  const tasks = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  const idx = tasks.findIndex((t: Task) => t.id === id);
  if (idx === -1) throw new Error('Not found');
  tasks[idx] = { ...tasks[idx], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(DB_KEY, JSON.stringify(tasks));
  return tasks[idx];
}

export async function deleteTask(id: string): Promise<void> {
  await delay(200);
  const tasks = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  const idx = tasks.findIndex((t: Task) => t.id === id);
  if (idx === -1) throw new Error('Not found');
  tasks.splice(idx, 1);
  localStorage.setItem(DB_KEY, JSON.stringify(tasks));
}
