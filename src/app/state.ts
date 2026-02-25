import { Injectable, signal, computed } from '@angular/core';

export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public todos = signal<Todo[]>([
    { id: 1, description: 'Build a project', completed: false },
    { id: 2, description: 'Learn React', completed: true },
  ]);

  public newTaskDescription = signal('');

  private nextId = signal(3);

  public total = computed(() => this.todos().length);

  public completed = computed(() => this.todos().filter((t) => t.completed).length);

  public pending = computed(() => this.total() - this.completed());

  public progress = computed(() => {
    const t = this.total();
    if (t === 0) return '0%';
    return `${Math.round((this.completed() / t) * 100)}%`;
  });

  public activeTodos = computed(() => this.todos().filter((t) => !t.completed));

  public completedTodos = computed(() => this.todos().filter((t) => t.completed));

  public addTask(): void {
    const desc = this.newTaskDescription().trim();
    if (!desc) return;

    let description = desc;
    if (description.toLowerCase().includes('<script>')) {
      description = `<span style="color: red;">[Script Detected]</span> ` + description;
    }

    const newTodo: Todo = {
      id: this.nextId(),
      description,
      completed: false,
    };

    this.todos.update((list) => [...list, newTodo]);
    this.nextId.update((n) => n + 1);
    this.newTaskDescription.set('');
  }

  public toggleCompleted(id: number): void {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  public deleteTask(id: number): void {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }

  public getStats(): { total: number; completed: number; pending: number } {
    return { total: this.total(), completed: this.completed(), pending: this.pending() };
  }

  public getProgressPercentage(): string {
    return this.progress();
  }
}
