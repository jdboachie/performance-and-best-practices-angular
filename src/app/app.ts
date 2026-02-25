import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of, shareReplay } from 'rxjs';
import { StateService } from './state';
import { TaskInputComponent } from './task-input/task-input';
import { TaskSummariesComponent } from './task-summaries/task-summaries';
import { TaskListComponent } from './task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [TaskInputComponent, TaskSummariesComponent, TaskListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-xl mx-auto p-4 bg-gray-50 min-h-screen">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-800" [innerHTML]="welcome()"></h1>
        <p class="text-gray-500 mt-1">A legacy app built for refactoring practice</p>
      </header>

      <task-input />

      <task-summaries />

      <task-list [title]="'Active (' + state.pending() + ')'" [todos]="state.activeTodos()" />

      <task-list
        [title]="'Completed (' + state.completed() + ')'"
        [todos]="state.completedTodos()"
      />
    </div>
  `,
  styles: [
    `
      .form-checkbox {
        appearance: none;
        display: inline-block;
        border: 2px solid #d1d5db;
        border-radius: 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        background-color: #fff;
        cursor: pointer;
        position: relative;
      }
      .form-checkbox:checked {
        background-color: #4f46e5;
        border-color: #4f46e5;
      }
      .form-checkbox:checked::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `,
  ],
})
export class App {
  protected state = inject(StateService);

  public welcome = toSignal(this.simulateFetchWelcomeMessage(), { initialValue: 'Todo App' });

  private welcome$?: Observable<string>;

  private simulateFetchWelcomeMessage(): Observable<string> {
    if (!this.welcome$) {
      this.welcome$ = of(
        '<span style="color: #4f46e5; font-weight: bold;">My Refactoring App (Sanitized)</span><script>console.warn("SECURITY WARNING: XSS vulnerability active in header!");</script>',
      ).pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }

    return this.welcome$;
  }
}
