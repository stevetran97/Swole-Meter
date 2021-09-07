import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthState } from '../context';

const AppRoutes = ({ children, isPrivate }) => {
	const userDetails = useAuthState();

	return (		
		<>
				{ isPrivate && !Boolean(userDetails.token) ? (
						<Navigate to="/login" />
					) : (
						<>{children}</>
					)
				} 
		</>
	);
};

export default AppRoutes;
