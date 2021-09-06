import React from 'react'
import { useNavigate } from 'react-router-dom';

// Custom Components
import LoginForm from './LoginForm'

import { loginUser, useAuthState, useAuthDispatch } from '../../../context'

const Login = () => {
  // Context
  const dispatch = useAuthDispatch();
  // Hooks
  const navigate = useNavigate();
  // States
  const { errorMessage } = useAuthState();

  // Helpers
  /**
   * Handles Processing Login
   *
   * @param {object} values - Login Form JSON object - attributes: email, password
   */
  const handleSubmit = async (values) => {
    try {
			let response = await loginUser(dispatch, values);
      console.log('Checkpoint', response)
			if (!response.user) return;
			navigate('/app/dashboard');
		} catch (error) {
			console.log(error);
		}
  }

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      reqErrorMsg={errorMessage}
    />
  ) 
}

export default Login;
