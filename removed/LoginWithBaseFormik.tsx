import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//import styles from '../styles/Login.module.css'

import { useFormik } from "formik";
import * as Yup from "yup";

/* import Head from "next/head";
import Script from "next/script"; */

import Vue from "vue";
import Vuetify from "vuetify";

const Login = () => {
  /* new Vue({
    el: "#vue",
    vuetify: new Vuetify(),
  }); */

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [username, setUsername] = useState("");

  return (
    <>
      {/* <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js" />
      <Script
        src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"
        onLoad={() =>
          new Vue({
            el: "#app",
            vuetify: new Vuetify(),
          })
        }
      /> */}

      <Box sx={{}}>
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
            <div id="vue">
              {/* <v-text-field
                label="Regular"
                outlined
                prepend-inner-icon="mdi-map-marker"
              /> */}
            </div>
            <Typography variant="h4" sx={{ fontFamily: "Rubik" }}>
              Let's get started
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontFamily: "Rubik", mb: 3 }}
            >
              Don't have an account? Check here
            </Typography>
            <Stack spacing={2}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  /* name="username" */
                  label="Username"
                  variant="outlined"
                  sx={{ borderRadius: 75 }}
                  {...formik.getFieldProps("username")}
                  /* onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username} */
                  error={formik.errors.username ? true : false}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Button type="submit" variant="contained" size="large">
                  LOGIN
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  onClick={() =>
                    formik.resetForm({
                      values: {
                        username: formik.values.username,
                        password: "",
                      },
                    })
                  }
                >
                  RESET
                </Button>
              </form>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
