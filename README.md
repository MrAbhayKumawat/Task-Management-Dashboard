# TaskFlow

A simple task management dashboard built with React and TypeScript. Organize your tasks across To Do, In Progress, and Done columns with drag-and-drop support.

## Features

- 📋 Create, edit, and delete tasks
- 🎯 Organize tasks in a Kanban-style board
- 🔍 Search and filter by status or priority
- 🎨 Light and dark theme support
- 📱 Works on desktop, tablet, and mobile
- 🔐 Simple authentication with demo account
- ✅ Real-time task updates

## Quick Start

### Setup

```bash
pnpm install
pnpm dev
```

The app runs on `http://localhost:5173` by default.

### Demo Login

```
Email: demo@example.com
Password: demo123
```

Alternative account:
```
Email: user@example.com
Password: password
```

## Project Structure

```
client/
├── components/
│   ├── tasks/          # Task board, columns, cards, and form
│   ├── Header.tsx      # Navigation and filters
│   ├── ProtectedRoute.tsx
│   └── ui/             # Radix UI components
├── pages/
│   ├── Dashboard.tsx   # Main app layout
│   ├── Login.tsx       # Login page
│   └── NotFound.tsx
├── store/
│   ├── taskSlice.ts    # Redux task state
│   └── authSlice.ts    # Redux auth state
├── api/
│   ├── mockTasks.ts    # Task CRUD API
│   └── mockAuth.ts     # Login logic
├── hooks/
│   └── useTheme.ts     # Theme toggle hook
└── App.tsx
```

## How It Works

### Tasks

Tasks are stored in localStorage and include:
- Title and description
- Status: To Do, In Progress, or Done
- Priority: Low, Medium, or High
- Due date (optional)

### State Management

Redux Toolkit manages:
- **Task state**: All tasks, filters, search
- **Auth state**: User info, login status, token

### Drag & Drop

Move tasks between columns by dragging. Changes are saved immediately to localStorage.

### Authentication

Uses fake JWT tokens stored in localStorage. On login:
1. Token and user info are saved
2. Dashboard becomes accessible
3. Token persists across page refreshes

## Building & Deployment

```bash
# Production build
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Type check
pnpm typecheck
```

Deploy to Netlify or Vercel by connecting your git repo.

## Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Hook Form** for forms
- **dnd-kit** for drag and drop
- **Tailwind CSS** for styling
- **Radix UI** for components
- **React Router** v6 for navigation

## Adding Features

### New Page

1. Create component in `client/pages/`
2. Add route in `client/App.tsx`
3. Wrap with `<ProtectedRoute>` if you need login

### New Task Field

1. Update `Task` interface in `client/store/taskSlice.ts`
2. Add input to `TaskForm.tsx`
3. Update mock API in `client/api/mockTasks.ts`

### Change Colors

Update CSS variables in `client/global.css` or edit Tailwind config in `tailwind.config.ts`.

## Notes

- All data persists in localStorage (not a real backend)
- Simulated API calls have intentional delays for realistic UX
- Theme preference is saved locally
- Session persists on page refresh
