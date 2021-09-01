import React, { useState } from 'react'

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
} from '@material-ui/core';

// For Sign in calls
import axios from 'axios'

import RegisterForm from './RegisterForm'

const Register = () => {
  // States
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: '',
    name:'',
    password: ''
  });

  // useEffects

  // Helpers
  const handleSubmit = (values, actions) => {

  }

  return (
    <>
      <Helmet>
        <title>Register | Swolemeter</title>
      </Helmet>
      <Box
        style = {{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <RegisterForm/>
        </Container>
      </Box>
    </>
  ); 
};

export default Register;



// handleSubmit -> 