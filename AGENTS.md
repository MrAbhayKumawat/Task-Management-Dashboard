# TaskFlow - Task Management Dashboard

A client-side React application for managing tasks with a Kanban-style board. Built with React 18, TypeScript, Redux Toolkit, and Tailwind CSS.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form
- **Drag & Drop**: dnd-kit
- **Styling**: Tailwind CSS 3 + Radix UI
- **Routing**: React Router 6
- **Testing**: Vitest

## Project Structure

```
client/
├── components/
│   ├── tasks/           # Task board, columns, cards, form
│   ├── Header.tsx       # Navigation and filters
│   ├── ProtectedRoute.tsx
│   └── ui/              # Radix UI components
├── pages/
│   ├── Dashboard.tsx    # Main app
│   ├── Login.tsx        # Authentication page
│   └── NotFound.tsx
├── store/
│   ├── taskSlice.ts     # Redux task state
│   ├── authSlice.ts     # Redux auth state
│   └── index.ts         # Store config
├── api/
│   ├── mockTasks.ts     # Task CRUD (localStorage)
│   └── mockAuth.ts      # Login logic
├── hooks/
│   └── useTheme.ts      # Dark/light theme
├── lib/
│   └── utils.ts         # Utility functions
└── App.tsx
```

## Key Features

- 📋 Create, edit, delete tasks
- 🎯 Organize tasks in Kanban board (To Do, In Progress, Done)
- 🔍 Search and filter by status/priority
- 🎨 Light and dark theme
- 📱 Responsive design
- 🔐 Login with demo account
- 🔄 Drag-and-drop between columns

## Development Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server (port 5173)
pnpm build      # Production build
pnpm test       # Run tests
pnpm typecheck  # TypeScript validation
```

## Demo Credentials

- Email: demo@example.com
- Password: demo123

## Deployment

Build and deploy the `dist/` folder to any static host (Netlify, Vercel, etc).

```bash
pnpm build
# dist/ folder is ready for deployment
