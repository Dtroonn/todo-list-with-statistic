import type { Location } from 'react-router-dom';
import type { INavigationTab } from './NavigationTabs.props';

export const defaultComparer = (tab: INavigationTab, location: Location) => {
	return tab.path === location.pathname;
};
