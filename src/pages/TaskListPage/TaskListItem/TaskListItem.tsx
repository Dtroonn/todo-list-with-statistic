import { memo } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { TASK_COLOR_BY_STATUS } from '@/constants';
import type { TaskListItemProps } from './TaskListItem.props';

const ROW_HEIGHT = 41;

export const TaskListItem = memo(function TaskListItem({
	task,
	virtualRowIndex,
	virtualRowStart,
	measureElement,
	scrollMargin,
	onFocus,
}: TaskListItemProps) {
	return (
		<Box
			data-index={virtualRowIndex}
			ref={measureElement}
			tabIndex={0}
			role="row"
			onFocus={() => onFocus(virtualRowIndex)}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				transform: `translateY(${virtualRowStart - scrollMargin}px)`,
			}}
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 140px',
				height: ROW_HEIGHT,
				alignItems: 'center',
				px: 2,
				borderBottom: '1px solid',
				borderColor: 'divider',
				'&:last-child': { borderBottom: 'none' },
				'&:focus-visible': {
					outline: '2px solid',
					outlineColor: 'primary.main',
					outlineOffset: '-2px',
				},
			}}
		>
			<Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
				{task.id}
			</Typography>
			<Chip
				label={task.status}
				size="small"
				sx={{ backgroundColor: TASK_COLOR_BY_STATUS[task.status], color: 'white' }}
			/>
		</Box>
	);
});
