import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { StateService } from '../state';

@Component({
  selector: 'task-summaries',
  imports: [],
  templateUrl: './task-summaries.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class TaskSummariesComponent {
  private state = inject(StateService);

  public get total() {
    return this.state.total();
  }

  public get completed() {
    return this.state.completed();
  }

  public get pending() {
    return this.state.pending();
  }

  public get progress() {
    return this.state.progress();
  }
}
