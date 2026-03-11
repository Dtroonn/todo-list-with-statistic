import { Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigationTransition } from '@/contexts';
import type { NavigationTabsProps } from './NavigationTabs.props';
import { defaultComparer } from './utils';

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
	tabs,
	comparer = defaultComparer,
	...props
}) => {
	const location = useLocation();
	const { navigate } = useNavigationTransition();
	const activeTabIdx = tabs.findIndex((tab) => comparer(tab, location));

	return (
		<Tabs value={activeTabIdx === -1 ? false : activeTabIdx} {...props}>
			{tabs.map((tab) => (
				<Tab tabIndex={1} key={tab.path} label={tab.label} onClick={() => navigate(tab.path)} />
			))}
		</Tabs>
	);
};
