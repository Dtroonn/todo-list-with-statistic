import type { TaskChangeType } from './TaskChangeType';
import type { ITask } from './Task';

export interface ITaskChangeEvent {
	type: TaskChangeType;
	task: ITask;
}
