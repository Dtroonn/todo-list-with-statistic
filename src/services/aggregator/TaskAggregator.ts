import { v4 as uuidv4 } from 'uuid';
import type { ITask, ITaskChangeEvent } from '../../types';
import { TaskStatus, TaskChangeType } from '../../types';
import { TASK_STATUSES } from '@/constants';

type ChangeCallback = (event: ITaskChangeEvent) => void;

function randomStatus(): TaskStatus {
	return TASK_STATUSES[Math.floor(Math.random() * TASK_STATUSES.length)];
}

export class TaskAggregator {
	private tasks: Map<string, ITask> = new Map();
	private subscribers: Set<ChangeCallback> = new Set();
	private intervalId: ReturnType<typeof setInterval> | null = null;

	constructor() {
		for (let i = 0; i < 200; i++) {
			const task: ITask = { id: uuidv4(), status: randomStatus() };
			this.tasks.set(task.id, task);
		}
		this.startInterval();
	}

	getById(id: string): ITask | undefined {
		return this.tasks.get(id);
	}

	getAll(): ITask[] {
		return Array.from(this.tasks.values());
	}

	subscribe(callback: ChangeCallback): () => void {
		this.subscribers.add(callback);
		return () => {
			this.subscribers.delete(callback);
		};
	}

	destroy(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
		}
	}

	private notify(event: ITaskChangeEvent): void {
		this.subscribers.forEach((cb) => cb(event));
	}

	private startInterval(): void {
		this.intervalId = setInterval(() => {
			this.tick();
		}, 1000);
	}

	private tick(): void {
		const action = Math.random();

		if (action < 0.33 || this.tasks.size === 0) {
			const task: ITask = { id: uuidv4(), status: randomStatus() };
			this.tasks.set(task.id, task);
			this.notify({ type: TaskChangeType.Created, task });
		} else if (action < 0.66) {
			const ids = Array.from(this.tasks.keys());
			const id = ids[Math.floor(Math.random() * ids.length)];
			const updated: ITask = { id, status: randomStatus() };
			this.tasks.set(id, updated);
			this.notify({ type: TaskChangeType.Updated, task: updated });
		} else {
			if (this.tasks.size > 1) {
				const ids = Array.from(this.tasks.keys());
				const id = ids[Math.floor(Math.random() * ids.length)];
				const task = this.tasks.get(id)!;
				this.tasks.delete(id);
				this.notify({ type: TaskChangeType.Deleted, task });
			}
		}
	}
}
