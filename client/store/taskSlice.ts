import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  items: Task[];
  search: string;
  statusFilter: TaskStatus | 'all';
  priorityFilter: Priority | 'all';
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  search: '',
  statusFilter: 'all',
  priorityFilter: 'all',
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: TaskStatus }>) => {
      const task = state.items.find(t => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.newStatus;
        task.updatedAt = new Date().toISOString();
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<TaskStatus | 'all'>) => {
      state.statusFilter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<Priority | 'all'>) => {
      state.priorityFilter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setSearch,
  setStatusFilter,
  setPriorityFilter,
  setLoading,
  setError,
} = taskSlice.actions;

export const selectTasks = (state: any) => state.tasks.items;
export const selectLoading = (state: any) => state.tasks.loading;
export const selectError = (state: any) => state.tasks.error;

export const selectFilteredTasks = (state: any) => {
  const { items, search, statusFilter, priorityFilter } = state.tasks;
  return items.filter((task: Task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
};

export default taskSlice.reducer;
