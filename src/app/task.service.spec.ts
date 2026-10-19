
import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { TaskDraft } from './task.model';

describe('TaskService', () => {
  let service: TaskService;

  const storageKey = 'taskflow.tasks.v1';

  const draft: TaskDraft = {
    title: '  Write tests  ',
    description: '  Unit test task service  ',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  };

  beforeEach(() => {
    localStorage.removeItem(storageKey);
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
    const updated = service.update(created.id, {
      ...draft,
      title: 'Updated title'
    });

    expect(updated.title).toBe('Updated title');
    expect(
      service.getAll().some(task => task.title === 'Updated title')
    ).toBeTrue();
  });

  it('throws when updating a task that does not exist', () => {
    expect(() => service.update('missing-id', draft))
      .toThrowError('Task not found.');
  });

  it('does not modify an existing task when an update title is blank', () => {
    const created = service.create(draft);

    expect(() =>
      service.update(created.id, { ...draft, title: '   ' })
    ).toThrowError('Task title is required.');

    const unchanged = service.getAll().find(task => task.id === created.id);

    expect(unchanged?.title).toBe('Write tests');
  });

  it('deletes a task', () => {
    const created = service.create(draft);

    service.delete(created.id);

    expect(
      service.getAll().some(task => task.id === created.id)
    ).toBeFalse();
  });

  it('persists changes to local storage', () => {
    service.create(draft);

    const stored = JSON.parse(
      localStorage.getItem(storageKey) ?? '[]'
    ) as unknown[];

    expect(stored.length).toBeGreaterThan(0);
  });

  it('recovers gracefully when local storage contains malformed JSON', () => {
    localStorage.setItem(storageKey, '{invalid-json');

    const recoveredService = new TaskService();

    expect(recoveredService.getAll().length).toBeGreaterThan(0);
  });

  it('recovers demo tasks when stored JSON is not an array', () => {
    localStorage.setItem(storageKey, JSON.stringify({ title: 'Invalid data' }));

    const recoveredService = new TaskService();

    expect(recoveredService.getAll().length).toBeGreaterThan(0);
  });

  it('ignores invalid task records when loading saved data', () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify([
        {
          id: 'valid-1',
          title: 'Valid task',
          status: 'Pending'
        },
        {
          id: 123,
          title: 'Invalid task',
          status: 'Pending'
        },
        {
          id: 'invalid-2',
          title: 'Invalid status',
          status: 'Unknown'
        }
      ])
    );

    const recoveredService = new TaskService();
    const tasks = recoveredService.getAll();

    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe('valid-1');
  });

  it('persists a task status change to local storage', () => {
    const created = service.create(draft);

    service.setStatus(created.id, 'Completed');

    const stored = JSON.parse(
      localStorage.getItem(storageKey) ?? '[]'
    ) as Array<{ id: string; status: string }>;

    const savedTask = stored.find(task => task.id === created.id);

    expect(savedTask?.status).toBe('Completed');
  });
});
