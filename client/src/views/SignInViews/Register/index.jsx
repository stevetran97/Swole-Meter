import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import RegisterForm from './RegisterForm'

import { signupUser, useAuthState, useAuthDispatch } from '../../../context'

const Register = () => {
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
  const handleSubmit = async (values, setSubmitting) => {
    try {
      let response = await signupUser(dispatch, values, signal);
      if (!response) throw new Error('No response');
      setSubmitting(false);
      navigate('/login');
    } catch (error) {
      console.log("[error] Registration handleSubmit", error);
    };
  };

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      reqErrorMsg={errorMessage}
    />
  ); 
};

export default Register;