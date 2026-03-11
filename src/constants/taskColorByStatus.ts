import { TaskStatus } from '@/types';

export const TASK_COLOR_BY_STATUS: Record<TaskStatus, string> = {
	[TaskStatus.Pending]: '#9e9e9e',
	[TaskStatus.InProgress]: '#fb8c00',
	[TaskStatus.Completed]: '#43a047',
	[TaskStatus.Cancelled]: '#e53935',
};
