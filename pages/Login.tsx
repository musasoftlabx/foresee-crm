import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/router";

import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { MdAccountCircle, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";

import { useAlertStore } from "../store";

import { TextFieldX } from "../components/InputFields/TextField";
import { LoadingButtonX } from "../components/InputFields/LoadingButton";

import { deleteCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);

  // ? Client state definitions
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state definitions
  const { mutate: login } = useMutation((body) => axios.post("login", body));

  useEffect(() => {
    deleteCookie("__aT");
  }, []);

  return (
    <Grid container minHeight={"100vh"}>
      <Grid xs={0} md={6} lg={7} sx={{ bgcolor: "blueviolet" }}></Grid>
      <Grid
        md={6}
        lg={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ px: 10 }}
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
          onSubmit={(values, { setSubmitting }) => {
            const encoded = new Buffer(values.password).toString("base64");
            login(
              //@ts-ignore
              { ...values, password: encoded },
              {
                onSuccess: () => router.push("/"),
                onError: (error: any) => {
                  setSubmitting(false);
                  showAlert({
                    status: error.response.data.status,
                    subject: error.response.data.subject,
                    body: error.response.data.body,
                  });
                },
              }
            );
          }}
        >
          {({ errors, touched, isSubmitting, getFieldProps }) => (
            <Form>
              <Stack spacing={2}>
                <TextFieldX
                  label="Username"
                  placeholder="Enter username"
                  prefixcon={<MdAccountCircle size={24} />}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  {...getFieldProps("username")}
                />

                <TextFieldX
                  type={showPassword ? "password" : "text"}
                  label="Password"
                  placeholder="Enter password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  {...getFieldProps("password")}
                  prefixcon={<AiFillLock size={24} />}
                  suffixcon={
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                      sx={{ color: errors.password ? "#d3302f" : "" }}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  }
                />

                <LoadingButtonX
                  type="submit"
                  placement="center"
                  size="large"
                  disabled={
                    JSON.stringify(touched) === "{}" ||
                    JSON.stringify(errors) !== "{}" ||
                    isSubmitting
                  }
                  loading={isSubmitting}
                  loadingtext="LOGGING IN..."
                >
                  LOGIN
                </LoadingButtonX>
              </Stack>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
