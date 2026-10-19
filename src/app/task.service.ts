import { Injectable } from '@angular/core';
import { Task, TaskDraft, TaskStatus } from './task.model';

const STORAGE_KEY = 'taskflow.tasks.v1';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = this.loadTasks();

  getAll(): Task[] {
    return [...this.tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  create(draft: TaskDraft): Task {
  const title = draft.title.trim();

  if (!title) {
    throw new Error('Task title is required.');
  }

  if (title.length > 120) {
    throw new Error('Task title must be 120 characters or fewer.');
  }

  const task: Task = {
    ...draft,
    title,
    description: draft.description.trim(),
    id: this.createId(),
    createdAt: new Date().toISOString()
  };

  this.tasks = [task, ...this.tasks];
  this.persist();

  return task;
}

 update(id: string, draft: TaskDraft): Task {
  const index = this.tasks.findIndex(task => task.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  const title = draft.title.trim();

  if (!title) {
    throw new Error('Task title is required.');
  }

  if (title.length > 120) {
    throw new Error('Task title must be 120 characters or fewer.');
  }

  const updated: Task = {
    ...this.tasks[index],
    ...draft,
    title,
    description: draft.description.trim()
  };

  this.tasks = this.tasks.map(task =>
    task.id === id ? updated : task
  );

  this.persist();

  return updated;
}

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.persist();
  }

  setStatus(id: string, status: TaskStatus): void {
    this.tasks = this.tasks.map(task => task.id === id ? { ...task, status } : task);
    this.persist();
  }

  private loadTasks(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.seedTasks();
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return this.seedTasks();
      return parsed.filter((item): item is Task =>
        !!item && typeof item === 'object' &&
        typeof (item as Task).id === 'string' &&
        typeof (item as Task).title === 'string' &&
        ['Pending', 'In Progress', 'Completed'].includes((item as Task).status)
      );
    } catch {
      // Recover gracefully if browser storage contains malformed or unavailable data.
      return this.seedTasks();
    }
  }

  private seedTasks(): Task[] {
    const now = new Date().toISOString();
    return [
      { id: 'demo-1', title: 'Review sprint backlog', description: 'Prioritize remaining stories for the next sprint.', status: 'In Progress', priority: 'High', dueDate: '', createdAt: now },
      { id: 'demo-2', title: 'Update onboarding guide', description: 'Add setup steps for new team members.', status: 'Pending', priority: 'Medium', dueDate: '', createdAt: now },
      { id: 'demo-3', title: 'Ship profile page improvements', description: 'Confirm responsive layout and accessibility.', status: 'Completed', priority: 'Low', dueDate: '', createdAt: now }
    ];
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch {
      // The app remains usable for this session if storage is blocked or full.
    }
  }

  private createId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}