import React from 'react'

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

// For Sign in calls
import axios from 'axios'

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        policy: false
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email("Please enter a valid email").max(255).required("Email is required"),
          name: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
          policy: Yup.boolean().oneOf([true], "This field must be checked")
        })
      }
      onSubmit={(values, actions) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);

            // Headers for post request
            const headers = {
              'Content-Type': 'application/json'
            }
            // Pass values object to post new user request
            axios.post('http://localhost:5000/auth/signup', values, headers)
              .then((res)=> {
                console.log("Post successful on FrontEnd: ", res)
              })
              .catch((e)=>{
                console.log("Registration API Call error: ", e)
              })
          }, 1000);
      }}
    >
      {({
        errors, 
        handleBlur, 
        handleChange, 
        handleSubmit, 
        isSubmitting,
        touched,
        values
      })=>(
        <form onSubmit={handleSubmit}>
          <Box style={{ mb: 3 }}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Create new Account
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Use your email to create a new account
            </Typography>
          </Box>
          {/* Name Input */}
          <TextField 
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="First name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
          />
          {/* Email Input */}
          <TextField 
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          {/* Password Input */}
          <TextField 
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {/* Terms */}
          <Box
            style={{
              alignItems: 'center',
              display: 'flex',
              ml: -1
            }}
          >
            <Checkbox 
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              I have read the 
              {' '}
              <Link 
                color="primary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {/* Error Display */}
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
          <Box style={{ py: 2}}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up now
            </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Already have an account?
            {' '}
            <Link
              component={RouterLink}
              to="/login"
              variant="h6"
            >
              Sign in
            </Link>
          </Typography>
        </form>
      )}
    </Formik>
  ); 
};

export default RegisterForm;
