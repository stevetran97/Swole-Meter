import React from 'react'
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

  // Helpers
  const handleSubmit = async (values) => {
    try {
      let response = await signupUser(dispatch, values);
      if (!response) throw new Error('No response');
      navigate('/login');
    } catch (error) {
      console.log(error);
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