import React, { useEffect } from 'react'
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

  // useEffect: Cleanup Login Request
  const controller = new AbortController();
  const { signal } = controller;
  useEffect(() => {
    return ()=>controller.abort()
  }, []);

  // Helpers
  /**
   * Handles Processing Login
   *
   * @param {object} values - Login Form JSON object - attributes: email, password
   */
  const handleSubmit = async (values, setSubmitting) => {
    try {
			let response = await loginUser(dispatch, values, signal);
			if (!response.user) return;
      setSubmitting(false);
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
