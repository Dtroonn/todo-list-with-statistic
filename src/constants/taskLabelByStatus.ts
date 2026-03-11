import { TaskStatus } from '@/types';

export const TASK_LABEL_BY_STATUS: Record<TaskStatus, string> = {
	[TaskStatus.Pending]: 'Pending',
	[TaskStatus.InProgress]: 'In Progress',
	[TaskStatus.Completed]: 'Completed',
	[TaskStatus.Cancelled]: 'Cancelled',
};
