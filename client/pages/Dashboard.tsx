import { Header } from '@/components/Header';
import { TaskBoard } from '@/components/tasks/TaskBoard';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TaskBoard />
      </main>
    </div>
  );
}
