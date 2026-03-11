import type { ITask } from '@/types';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export interface TaskListItemProps {
	task: ITask;
	virtualRowIndex: VirtualItem['index'];
	virtualRowStart: VirtualItem['start'];
	measureElement: Virtualizer<Window, Element>['measureElement'];
	scrollMargin: number;
	onFocus: (index: number) => void;
}
