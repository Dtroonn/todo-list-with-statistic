import { createContext, useContext } from 'react';
import type { NavigateFunction } from 'react-router';

export interface INavigationTransitionContext {
	isPending: boolean;
	navigate: NavigateFunction;
}

export const NavigationTransitionContext = createContext<INavigationTransitionContext | null>(null);

export function useNavigationTransition(): INavigationTransitionContext {
	const ctx = useContext(NavigationTransitionContext);
	if (!ctx)
		throw new Error('useNavigationTransition must be used inside NavigationTransitionProvider');
	return ctx;
}
