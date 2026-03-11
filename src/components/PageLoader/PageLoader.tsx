import { Box, CircularProgress } from '@mui/material';

export function PageLoader() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
			<CircularProgress size={70} />
		</Box>
	);
}
