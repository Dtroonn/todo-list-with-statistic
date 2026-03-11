import { useTransition, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationTransitionContext } from './NavigationTransitionContext';

export function NavigationTransitionProvider({ children }: PropsWithChildren) {
	const [isPending, startTransition] = useTransition();
	const rawNavigate = useNavigate();

	const navigate: typeof rawNavigate = (...args) => {
		startTransition(() => {
			rawNavigate(...(args as Parameters<typeof rawNavigate>));
		});
	};

	return (
		<NavigationTransitionContext value={{ isPending, navigate }}>
			{children}
		</NavigationTransitionContext>
	);
}
