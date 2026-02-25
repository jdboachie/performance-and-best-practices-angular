import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { StateService, Todo } from '../state';
import { SanitizeHtmlPipe } from '../sanitize-html.pipe';

@Component({
  selector: 'task-list',
  imports: [SanitizeHtmlPipe],
  templateUrl: './task-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class TaskListComponent {
  private state = inject(StateService);

  readonly title = input('');
  readonly todos = input<Todo[]>([]);

  public toggle(todo: Todo): void {
    this.state.toggleCompleted(todo.id);
  }

  public delete(id: number): void {
    this.state.deleteTask(id);
  }
}
