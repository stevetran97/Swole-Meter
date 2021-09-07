import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core'


const LoginForm = ({
  handleSubmit,
  reqErrorMsg
}) => {
  return(
    <>
      <Helmet>
        <title>Login | Swolemeter</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "", 
              password: ""
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email("Please enter a valid email").max(255).required("Email is required"),
              password: Yup.string().max(255).required("Password is required")
            })}
            // Function for handling post request to login: Not finished
            onSubmit = {async (values, actions) => {
              actions.setSubmitting(true);
              const response = await handleSubmit(values, actions.setSubmitting)
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
            }) => (
              <form onSubmit={handleSubmit}>   
                {/* {reqErrorMsg ? (
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    {reqErrorMsg}
                  </Typography>
                  ) : ''
                } */}

                {isSubmitting ? (
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    Submitting...
                  </Typography>
                  ) : ''
                }
                <Box style={{mb: 3}}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign In
                  </Typography>
                </Box>
                <Box>
                  <TextField 
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
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
                </Box>
                <Box style={{py: 2}}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in Now
                  </Button>
                </Box>
                <Typography 
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  )
}

export default LoginForm