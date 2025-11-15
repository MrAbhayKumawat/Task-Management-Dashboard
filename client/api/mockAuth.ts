import { User } from '@/store/authSlice';

const USERS = [
  { id: '1', email: 'demo@example.com', name: 'Demo User', password: 'demo123' },
  { id: '2', email: 'user@example.com', name: 'John Doe', password: 'password' },
];

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

function generateToken(userId: string, email: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: userId, email, iat: Math.floor(Date.now() / 1000) }));
  const sig = btoa('sig');
  return `${header}.${payload}.${sig}`;
}

export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  await delay(500);
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  const token = generateToken(user.id, user.email);
  return { user: { id: user.id, email: user.email, name: user.name }, token };
}

export function restoreSession(): { user: User; token: string } | null {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  if (!token || !user) return null;
  try {
    return { token, user: JSON.parse(user) };
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: User): void {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
}
