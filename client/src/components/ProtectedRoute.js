import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthState } from '../context';

const ProtectedRoute = ({ children, isPrivate }) => {
	const userDetails = useAuthState();

	return (		
		<>
				{/* -------------------------------- Steve Authentication Cookie JWT */}
				{/* Renavigate to login if no token exists in global state */}

				{/* -------------------------------- Steve Authentication Cookie JWT */}

				{!Boolean(userDetails.authenticated) ? (
						<Navigate to="/login" />
					) : (
						<>{children}</>
					)
				} 
		</>
	);
};

export default ProtectedRoute;
