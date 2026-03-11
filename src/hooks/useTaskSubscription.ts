import { useEffect, useRef, useState } from 'react';
import type { ITask } from '../types';
import { TaskChangeType } from '../types';
import { taskAggregator } from '../services';

type Return = [ITask[], () => void, () => void];

export function useTaskSubscription(): Return {
	const [tasks, setTasks] = useState<ITask[]>(() => taskAggregator.getAll());
	const isPauseRef = useRef<boolean>(false);

	const pause = () => {
		isPauseRef.current = true;
	};

	const resume = () => {
		isPauseRef.current = false;
	};

	useEffect(() => {
		const unsubscribe = taskAggregator.subscribe((event) => {
			if (isPauseRef.current) return;

			if (event.type === TaskChangeType.Created) {
				setTasks((prev) => [...prev, event.task]);
			} else if (event.type === TaskChangeType.Updated) {
				setTasks((prev) => prev.map((t) => (t.id === event.task.id ? event.task : t)));
			} else if (event.type === TaskChangeType.Deleted) {
				setTasks((prev) => prev.filter((t) => t.id !== event.task.id));
			}
		});

		return unsubscribe;
	}, []);

	return [tasks, pause, resume];
}
