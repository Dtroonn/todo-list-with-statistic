import { Box, Button, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from 'react';
import { TaskStatus } from '../../types';
import { useTaskSubscription } from '../../hooks/useTaskSubscription';
import { TASK_COLOR_BY_STATUS, TASK_LABEL_BY_STATUS, TASK_STATUSES } from '@/constants';

export function StatisticsPage() {
	const [tasks, pause, resume] = useTaskSubscription();
	const [pausedAt, setPausedAt] = useState<Date | null>(null);

	const handleTogglePause = () => {
		if (pausedAt) {
			resume();
			setPausedAt(null);
			return;
		}
		pause();
		setPausedAt(new Date());
	};

	const counts = TASK_STATUSES.reduce<Record<TaskStatus, number>>(
		(acc, s) => ({ ...acc, [s]: 0 }),
		{} as Record<TaskStatus, number>,
	);
	tasks.forEach((t) => {
		counts[t.status] += 1;
	});

	const data = TASK_STATUSES.filter((s) => counts[s] > 0).map((s) => ({
		id: s,
		value: counts[s],
		label: TASK_LABEL_BY_STATUS[s],
		color: TASK_COLOR_BY_STATUS[s],
	}));

	return (
		<Box sx={{ p: 3 }}>
			<Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
				<Typography variant="h5">Statistics — {tasks.length} total tasks</Typography>
				<Button
					variant="outlined"
					size="small"
					color={pausedAt ? 'success' : 'warning'}
					onClick={handleTogglePause}
				>
					{pausedAt ? 'Resume' : 'Pause'}
				</Button>
			</Stack>
			{pausedAt && (
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					Snapshot as of {pausedAt.toLocaleDateString()} {pausedAt.toLocaleTimeString()}
				</Typography>
			)}
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: 4 }}>
				{tasks.length === 0 ? (
					<Typography color="text.secondary">No tasks yet.</Typography>
				) : (
					<PieChart
						series={[
							{
								data,
								highlightScope: { fade: 'global', highlight: 'item' },
								arcLabel: (item) => `${item.value}`,
								arcLabelMinAngle: 20,
							},
						]}
						hideLegend
						sx={{
							flex: 0,
						}}
						width={300}
						height={300}
					/>
				)}
				<Stack spacing={1}>
					{TASK_STATUSES.map((s) => (
						<Stack key={s} direction="row" alignItems="center" spacing={1}>
							<Box
								sx={{
									width: 14,
									height: 14,
									borderRadius: '50%',
									backgroundColor: TASK_COLOR_BY_STATUS[s],
									flexShrink: 0,
								}}
							/>
							<Typography variant="body2">
								{TASK_LABEL_BY_STATUS[s]}: <strong>{counts[s]}</strong>
							</Typography>
						</Stack>
					))}
				</Stack>
			</Box>
		</Box>
	);
}
