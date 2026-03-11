import { TaskStatus } from '@/types';

export const TASK_STATUSES: TaskStatus[] = [
	TaskStatus.Pending,
	TaskStatus.InProgress,
	TaskStatus.Completed,
	TaskStatus.Cancelled,
];
