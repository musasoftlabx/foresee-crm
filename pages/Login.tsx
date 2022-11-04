import { useState } from "react";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import LoadingButton from "@mui/lab/LoadingButton";

import { MdAccountCircle, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

//import styles from '../styles/Login.module.css'

import { Formik, Form } from "formik";
import * as Yup from "yup";

/* import Head from "next/head";
import Script from "next/script"; */

/* import Vue from "vue";
import Vuetify from "vuetify"; */

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <Grid container minHeight={"100vh"}>
      <Grid xs={0} md={6} lg={7} sx={{ bgcolor: "blueviolet" }}>
        djdj
      </Grid>
      <Grid
        md={6}
        lg={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ px: 20 }}
      >
        <Typography variant="h4" sx={{ fontFamily: "Rubik" }}>
          Let&apos;s get started
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontFamily: "Rubik", mb: 3 }}
        >
          Don&apos;t have an account? Check here
        </Typography>

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(3, "Must be 3 characters or more")
              .required("Required"),
            password: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
                  username: "",
                  password: "",
                },
              });
            }, 4000);
          }}
        >
          {({ values, errors, touched, isSubmitting, getFieldProps }) => (
            <Form>
              <Stack spacing={2}>
                <TextField
                  sx={{ borderRadius: 75 }}
                  label="Username"
                  placeholder="Enter username"
                  variant="outlined"
                  {...getFieldProps("username")}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdAccountCircle
                          size={24}
                          style={{
                            color:
                              touched.username && errors.username
                                ? "#d3302f"
                                : "",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl variant="outlined">
                  <InputLabel
                    style={{
                      color:
                        touched.password && errors.password ? "#d3302f" : "",
                    }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "password" : "text"}
                    label="Password"
                    placeholder="Enter password"
                    {...getFieldProps("password")}
                    error={touched.password && Boolean(errors.password)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AiFillLock
                          size={24}
                          style={{
                            color:
                              touched.password && errors.password
                                ? "#d3302f"
                                : "",
                          }}
                        />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    style={{
                      color:
                        touched.password && errors.password ? "#d3302f" : "",
                    }}
                  >
                    {touched.password && errors.password}
                  </FormHelperText>
                </FormControl>

                <LoadingButton
                  type="submit"
                  size="large"
                  // @ts-ignore
                  disabled={
                    !values.username ||
                    !values.password ||
                    errors.username ||
                    errors.password ||
                    isSubmitting
                  }
                  loading={isSubmitting}
                  loadingIndicator="LOGGING IN....."
                  variant="contained"
                >
                  LOGIN
                </LoadingButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
