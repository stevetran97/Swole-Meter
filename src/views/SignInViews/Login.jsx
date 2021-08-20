import React from 'react'

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import * as Yup from 'react-yup';
// import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core'

const Login = () => {
  const navigate = useNavigate();

  return (
    <Helmet>
      <title>Login | Swolemeter</title>
      <Box
      
      >
        Text Login Page
      </Box>
    </Helmet>
  ) 
}

export default Login;
