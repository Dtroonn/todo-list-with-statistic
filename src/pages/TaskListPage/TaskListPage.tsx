import { useCallback, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useTaskSubscription } from '../../hooks/useTaskSubscription';
import { TaskListItem } from './TaskListItem';

const ROW_HEIGHT = 41;
const HEADER_HEIGHT = 41;

export function TaskListPage() {
	const [tasks] = useTaskSubscription();
	const [scrollMargin, setScrollMargin] = useState(0);

	const listRef = useCallback((node: HTMLDivElement | null) => {
		if (node !== null) {
			setScrollMargin(node.offsetTop);
		}
	}, []);

	const virtualizer = useWindowVirtualizer({
		count: tasks.length,
		estimateSize: () => ROW_HEIGHT,
		overscan: 10,
		scrollMargin,
		scrollPaddingStart: HEADER_HEIGHT,
	});

	const items = virtualizer.getVirtualItems();

	const virtualizerMeasureElement: typeof virtualizer.measureElement = useCallback(
		(...args) => virtualizer.measureElement(...args),
		[virtualizer],
	);

	const handleItemFocus = useCallback(
		(index: number) => virtualizer.scrollToIndex(index, { align: 'center' }),
		[virtualizer],
	);

	return (
		<Box sx={{ p: 3 }}>
			{!tasks.length && (
				<Stack alignItems="center" sx={{ mt: 4 }}>
					<Typography color="text.secondary">No tasks yet...</Typography>
				</Stack>
			)}
			{!!tasks.length && (
				<Paper>
					{/* Header */}
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr 140px',
							height: HEADER_HEIGHT,
							alignItems: 'center',
							px: 2,
							borderBottom: '1px solid',
							borderColor: 'divider',
							position: 'sticky',
							top: (theme) => theme.mixins.toolbar.minHeight,
							backgroundColor: 'background.paper',
							zIndex: 1,
						}}
					>
						<Typography variant="body2" fontWeight="bold">
							ID — Tasks: {tasks.length}
						</Typography>
						<Typography variant="body2" fontWeight="bold" textAlign="center">
							Status
						</Typography>
					</Box>

					{/* Virtual list */}
					<Box
						ref={listRef}
						role="grid"
						aria-rowcount={tasks.length}
						style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
					>
						{items.map((virtualRow) => (
							<TaskListItem
								key={virtualRow.key}
								task={tasks[virtualRow.index]}
								virtualRowIndex={virtualRow.index}
								virtualRowStart={virtualRow.start}
								measureElement={virtualizerMeasureElement}
								scrollMargin={virtualizer.options.scrollMargin}
								onFocus={handleItemFocus}
							/>
						))}
					</Box>
				</Paper>
			)}
		</Box>
	);
}
