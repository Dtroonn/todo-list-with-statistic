import type { TabsProps } from '@mui/material';
import type { Location } from 'react-router-dom';

export interface INavigationTab {
	label: string;
	path: string;
}

export interface NavigationTabsProps extends Omit<TabsProps, 'value'> {
	tabs: INavigationTab[];
	comparer?: (tab: INavigationTab, location: Location) => boolean;
}
