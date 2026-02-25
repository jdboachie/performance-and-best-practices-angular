import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { StateService } from '../state';

@Component({
  selector: 'task-input',
  imports: [],
  templateUrl: './task-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class TaskInputComponent {
  private state = inject(StateService);

  public get newTask() {
    return this.state.newTaskDescription();
  }

  public setNewTask(value: string): void {
    this.state.newTaskDescription.set(value);
  }

  public add(): void {
    this.state.addTask();
  }
}
