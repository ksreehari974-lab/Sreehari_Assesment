import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { TaskDraft } from './task.model';

describe('TaskService', () => {
  let service: TaskService;
  const draft: TaskDraft = {
    title: '  Write tests  ',
    description: '  Unit test task service  ',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  };

  beforeEach(() => {
    localStorage.removeItem('taskflow.tasks.v1');
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('loads demo tasks when storage is empty', () => {
    expect(service.getAll().length).toBeGreaterThan(0);
  });

  it('trims title and description when creating a task', () => {
    const task = service.create(draft);
    expect(task.title).toBe('Write tests');
    expect(task.description).toBe('Unit test task service');
  });

  it('rejects a blank title', () => {
    expect(() => service.create({ ...draft, title: '   ' }))
      .toThrowError('Task title is required.');
  });

  it('updates an existing task', () => {
    const created = service.create(draft);
    const updated = service.update(created.id, { ...draft, title: 'Updated title' });
    expect(updated.title).toBe('Updated title');
    expect(service.getAll().some(task => task.title === 'Updated title')).toBeTrue();
  });

  it('throws when updating a task that does not exist', () => {
    expect(() => service.update('missing-id', draft)).toThrowError('Task not found.');
  });

  it('deletes a task', () => {
    const created = service.create(draft);
    service.delete(created.id);
    expect(service.getAll().some(task => task.id === created.id)).toBeFalse();
  });

  it('persists changes to local storage', () => {
    service.create(draft);
    const stored = JSON.parse(localStorage.getItem('taskflow.tasks.v1') ?? '[]') as unknown[];
    expect(stored.length).toBeGreaterThan(0);
  });
});