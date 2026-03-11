import { lazy, Suspense } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationProgress, NavigationTabs, PageLoader, type INavigationTab } from './components';
import { NavigationTransitionProvider } from '@/contexts';
import { MAIN_NAVIGATION_PATH } from './constants';

const TaskListPage = lazy(() =>
	import('./pages/TaskListPage').then((m) => ({ default: m.TaskListPage })),
);
const StatisticsPage = lazy(() =>
	import('./pages/StatisticsPage').then((m) => ({ default: m.StatisticsPage })),
);

// Можно вынести в constants
const NAV_TABS: INavigationTab[] = [
	{ label: 'Tasks', path: MAIN_NAVIGATION_PATH.tasks },
	{ label: 'Statistics', path: MAIN_NAVIGATION_PATH.statistics },
];

function App() {
	return (
		<NavigationTransitionProvider>
			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
				<NavigationProgress />
				<AppBar position="fixed">
					<Toolbar>
						<Typography variant="h6" sx={{ mr: 3 }}>
							Todo List
						</Typography>
						<NavigationTabs textColor="inherit" indicatorColor="secondary" tabs={NAV_TABS} />
					</Toolbar>
				</AppBar>
				<Toolbar />
				<Box component="main" sx={{ flex: 1 }}>
					<Suspense fallback={<PageLoader />}>
						<Routes>
							<Route path="/" element={<Navigate to="/tasks" replace />} />
							<Route path="/tasks" element={<TaskListPage />} />
							<Route path="/statistics" element={<StatisticsPage />} />
						</Routes>
					</Suspense>
				</Box>
			</Box>
		</NavigationTransitionProvider>
	);
}

export default App;
