import React from 'react'

import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

// For Sign in calls
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate();

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
              firstname: "",
              lastname: "", 
              password: "",
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email("Please enter a valid email").max(255).required("Email is required"),
                firstname: Yup.string().max(255).required("First name is required"),
                lastname: Yup.string().max(255).required("Last name is required"),
                password: Yup.string().max(255).required("Password is required"),
                policy: Yup.boolean().oneOf([true], "This field must be checked")
              })
            }
            onSubmit={(values, actions) => {
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);

                  axios.post("/user/register", JSON.stringify(values, null, 2))
                    .then(()=>alert("Post successful"))
                    .catch((e)=>console.log(e))

                }, 1000);

                // Add api call to create user and redirect to dashboard
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
                {/* First Name Input */}
                <TextField 
                  error={Boolean(touched.firstname && errors.firstname)}
                  fullWidth
                  helperText={touched.firstname && errors.firstname}
                  label="First name"
                  margin="normal"
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstname}
                  variant="outlined"
                />
                {/* Last Name Input */}
                <TextField 
                  error={Boolean(touched.lastname && errors.lastname)}
                  fullWidth
                  helperText={touched.lastname && errors.lastname}
                  label="Last name"
                  margin="normal"
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
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

export default Register;
