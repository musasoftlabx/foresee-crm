// * React imports
import React, { useState, useEffect } from "react";

// * NextJS imports
import { useRouter } from "next/router";
import Image from "next/image";

// * Material UI imports
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// * React Icons imports
import { AiFillLock } from "react-icons/ai";
import { MdAccountCircle, MdVisibility, MdVisibilityOff } from "react-icons/md";

// * Extra Packages imports
import * as Yup from "yup";
import { getCookie, deleteCookie } from "cookies-next";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// * Project Components imports
import { useAlertStore } from "../store";
import { LoadingButtonX } from "../components/InputFields/LoadingButtonX";
import SwitchX from "../components/InputFields/SwitchX";
import { TextFieldX } from "../components/InputFields/TextFieldX";

// * Images imports
import LoginVector from "../public/images/login_vector.png";

const Login = ({ theme }: any) => {
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
    <>
      <AppBar
        position="absolute"
        color="transparent"
        sx={{ boxShadow: "unset" }}
      >
        <Toolbar variant="dense" sx={{ height: 1 }}>
          <span style={{ flexGrow: 1 }} />
          <SwitchX />
        </Toolbar>
      </AppBar>

      <Grid container minHeight={"100vh"}>
        <Grid
          xs={0}
          md={6}
          lg={7}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              mt: -2,
              ml: 10,
              fontFamily: "Lobster Two",
              fontStyle: "italic",
              fontWeight: "bold",
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(to right, #5A0CCF 0%, #CF1512 100%)"
                  : "linear-gradient(to right, #dfcaff 0%, #ff2e2a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Foresee CRM
          </Typography>
          <Image
            src={LoginVector}
            height="2000vh"
            objectFit="contain"
            alt="Login Vector Illustration"
            placeholder="blur"
          />
        </Grid>
        <Grid
          md={6}
          lg={5}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <motion.div
            layout
            initial={{ x: "-50vw" }}
            animate={{ x: "0vw" }}
            transition={{
              layout: { duration: 1, type: "spring" },
            }}
          >
            <Typography variant="h4">Let&apos;s get started</Typography>
          </motion.div>

          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontFamily: "Rubik", mb: 1 }}
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
                  onSuccess: () =>
                    !localStorage.lastRoute ||
                    localStorage.lastRoute === "/login"
                      ? router.push("/")
                      : router.push(localStorage.lastRoute),
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
                <Grid
                  container
                  rowSpacing={2}
                  columns={{ xs: 12, md: 9, lg: 7 }}
                >
                  <Grid display="flex" flexDirection="column">
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
                          {showPassword ? (
                            <MdVisibility />
                          ) : (
                            <MdVisibilityOff />
                          )}
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
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

/* export async function getStaticProps() {
  const x = await fetch("./api/hello");
  const y = await x.json();

  console.log(y);

  return {
    props: {
      res: y,
    },
  };
} */
