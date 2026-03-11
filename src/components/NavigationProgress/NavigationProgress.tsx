import { useEffect, useRef, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useNavigationTransition } from '@/contexts';

const DELAY_MS = 200;

export function NavigationProgress() {
	const { isPending } = useNavigationTransition();
	const [visible, setVisible] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current);

		timerRef.current = setTimeout(
			() => {
				setVisible(isPending);
			},
			isPending ? DELAY_MS : 0,
		);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [isPending]);

	if (!visible) return null;
	return (
		<LinearProgress
			color="secondary"
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				zIndex: (theme) => theme.zIndex.appBar + 1,
			}}
		/>
	);
}
