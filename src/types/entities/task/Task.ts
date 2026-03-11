import type { TaskStatus } from './TaskStatus';

export interface ITask {
	id: string;
	status: TaskStatus;
}
