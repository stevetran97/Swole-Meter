import React from 'react'

import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';


const RegisterForm = ({
  handleSubmit,
  reqErrorMsg
}) => {
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
            onSubmit = {async (values, actions) => {
                actions.setSubmitting(true);
                const response = await handleSubmit(values);
                console.log(response)
                actions.setSubmitting(false);
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
                {reqErrorMsg ? (
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    {reqErrorMsg}
                  </Typography>
                  ) : ''
                }

                {isSubmitting ? (
                  <Typography
                    color="textPrimary"
                    variant="h6"
                  >
                    Submitting...
                  </Typography>
                  ) : ''
                }
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
        </Container>
      </Box>
    </>
  ); 
};

export default RegisterForm;
