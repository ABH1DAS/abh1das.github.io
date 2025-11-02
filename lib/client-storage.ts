import { User, Issue, Comment } from './types';

// Initialize storage with mock data
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  // Initialize users if not exists
  if (!localStorage.getItem('users')) {
    const initialUsers: User[] = [
      {
        id: "1",
        email: "authority@example.com",
        password: "password",
        name: "John Doe",
        role: "authority",
        department: "Public Works",
        createdAt: new Date()
      },
      {
        id: "2",
        email: "citizen@example.com",
        password: "password",
        name: "Jane Smith",
        role: "citizen",
        createdAt: new Date()
      }
    ];
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  // Initialize issues if not exists
  if (!localStorage.getItem('issues')) {
    const initialIssues: Issue[] = [
      {
        id: "1",
        title: "Pothole on Main Street",
        description: "Large pothole causing traffic hazards",
        category: "infrastructure",
        priority: "high",
        status: "pending",
        location: {
          address: "123 Main St"
        },
        citizenId: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    localStorage.setItem('issues', JSON.stringify(initialIssues));
  }

  // Initialize comments if not exists
  if (!localStorage.getItem('comments')) {
    const initialComments: Comment[] = [];
    localStorage.setItem('comments', JSON.stringify(initialComments));
  }
}

// Storage operations
export function getFromStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Helper functions for specific data types
export function getUsers(): User[] {
  return getFromStorage<User>('users');
}

export function getIssues(): Issue[] {
  return getFromStorage<Issue>('issues');
}

export function getComments(): Comment[] {
  return getFromStorage<Comment>('comments');
}

export function saveUsers(users: User[]): void {
  saveToStorage('users', users);
}

export function saveIssues(issues: Issue[]): void {
  saveToStorage('issues', issues);
}

export function saveComments(comments: Comment[]): void {
  saveToStorage('comments', comments);
}

// Authentication helpers
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
}