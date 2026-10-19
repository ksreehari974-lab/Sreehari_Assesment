import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskDraft, TaskPriority, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  searchTerm = '';
  statusFilter: 'All' | TaskStatus = 'All';
  showForm = false;
  editingId: string | null = null;
  message = '';
  errorMessage = '';

  draft: TaskDraft = this.emptyDraft();

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.refresh();
  }

  get filteredTasks(): Task[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    return this.tasks.filter(task => {
      const matchesText = !query ||
        task.title.toLocaleLowerCase().includes(query) ||
        task.description.toLocaleLowerCase().includes(query);
      const matchesStatus = this.statusFilter === 'All' || task.status === this.statusFilter;
      return matchesText && matchesStatus;
    });
  }

  get completedCount(): number {
    return this.tasks.filter(task => task.status === 'Completed').length;
  }

  get pendingCount(): number {
    return this.tasks.filter(task => task.status !== 'Completed').length;
  }

  openCreateForm(): void {
    this.editingId = null;
    this.draft = this.emptyDraft();
    this.errorMessage = '';
    this.showForm = true;
  }

  openEditForm(task: Task): void {
    this.editingId = task.id;
    this.draft = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    };
    this.errorMessage = '';
    this.showForm = true;
  }

  saveTask(): void {
    this.message = '';
    this.errorMessage = '';
    if (!this.draft.title.trim()) {
      this.errorMessage = 'Please enter a task title.';
      return;
    }
    try {
      if (this.editingId) {
        this.taskService.update(this.editingId, this.draft);
        this.message = 'Task updated successfully.';
      } else {
        this.taskService.create(this.draft);
        this.message = 'Task created successfully.';
      }
      this.showForm = false;
      this.refresh();
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Unable to save this task. Please try again.';
    }
  }

  deleteTask(task: Task): void {
    const confirmed = typeof window !== 'undefined' &&
      window.confirm(`Delete "${task.title}"? This action cannot be undone.`);
    if (!confirmed) return;
    this.taskService.delete(task.id);
    this.message = 'Task deleted.';
    this.refresh();
  }

  changeStatus(task: Task, status: TaskStatus): void {
    this.taskService.setStatus(task.id, status);
    this.refresh();
  }

  trackById(_index: number, task: Task): string {
    return task.id;
  }

  priorityClass(priority: TaskPriority): string {
    return priority.toLowerCase();
  }

  private refresh(): void {
    this.tasks = this.taskService.getAll();
  }

  private emptyDraft(): TaskDraft {
    return { title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' };
  }
}