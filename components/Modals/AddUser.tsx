import { useUserStore } from "../../store";
import { customTheme } from "../../utils/theme";
import { TextFieldX } from "../InputFields/TextField";

import { styled, ThemeProvider } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form } from "formik";

import { RiCloseFill } from "react-icons/ri";

import * as Yup from "yup";
import axios from "axios";

import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

export default function AddUser() {
  const {
    mutate,
    isLoading: mutationLoading,
    isSuccess: mutationSuccess,
    isError: mutationError,
  } = useMutation((data) => axios.post("users", data));

  const style = {
    backgroundColor: "white", //grey[50],
    borderRadius: "20px",
    //borderTop: `1px solid ${gradients[status][1]}`,
    left: "50%",
    maxWidth: "300px",
    overflow: "hidden",
    //px: 2,
    //pt: 3,
    pb: 2,
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    zIndex: "9999",
  };

  const CloseButton = styled(RiCloseFill)({
    "&:hover": {
      color: red[500],
      transform: "rotate(90deg)",
      transition: "transform 0.3s",
    },
  });

  const handleClose = useUserStore((state) => state.toggle);

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={useUserStore((state) => state.isOpen)} onClose={handleClose}>
        <Box sx={style}>
          <svg
            viewBox="650 250 300 300"
            width="100%"
            height="300"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{ position: "absolute", zIndex: -1 }}
          >
            <path
              d="M0 447L16.7 425.5C33.3 404 66.7 361 100 358.3C133.3 355.7 166.7 393.3 200 385.7C233.3 378 266.7 325 300 314.7C333.3 304.3 366.7 336.7 400 355.2C433.3 373.7 466.7 378.3 500 371.2C533.3 364 566.7 345 600 338.5C633.3 332 666.7 338 700 367.3C733.3 396.7 766.7 449.3 800 431C833.3 412.7 866.7 323.3 883.3 278.7L900 234L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
              fill="#0066FF"
              stroke-linecap="round"
              stroke-linejoin="miter"
            ></path>
          </svg>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              emailAddress: "",
              domain: "",
              domains: [
                "Foresee",
                "LC Waikiki",
                "FLO",
                "Carrefour",
                "Naivas",
                "Versace",
                "Bata",
              ],
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(20, "Max of 20 chars")
                .required("Required"),
              lastName: Yup.string()
                .max(20, "Max of 20 chars")
                .required("Required"),
              emailAddress: Yup.string()
                .email("Invalid email")
                .max(50, "Max of 50 chars")
                .required("Required"),
              domain: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              mutate(JSON.stringify(values), {
                onSuccess: () => resetForm(),
                onError: (error) => {
                  setSubmitting(false);
                  alert(error);
                },
                onSettled: (data, error, variables, context) => {},
              });
            }}
          >
            {({ values, errors, touched, getFieldProps, isSubmitting }) => (
              <Form>
                <Grid container>
                  <Grid xs={12}>
                    <Stack
                      direction="row"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mr: 2, ml: 3, mt: 3 }}
                    >
                      <Typography variant="h5" color={red[50]}>
                        Add user
                      </Typography>
                      <IconButton onClick={handleClose}>
                        <CloseButton />
                      </IconButton>
                    </Stack>

                    <Stack spacing={2} sx={{ mx: 2, mt: 2 }}>
                      <TextFieldX
                        label="First Name *"
                        {...getFieldProps("firstName")}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />

                      <TextFieldX
                        label="Last Name *"
                        {...getFieldProps("lastName")}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />

                      <TextFieldX
                        label="Email Address *"
                        {...getFieldProps("emailAddress")}
                        error={
                          touched.emailAddress && Boolean(errors.emailAddress)
                        }
                        helperText={touched.emailAddress && errors.emailAddress}
                      />

                      <TextFieldX
                        label="Domain *"
                        select
                        {...getFieldProps("domain")}
                        error={touched.domain && Boolean(errors.domain)}
                        helperText={touched.domain && errors.domain}
                      >
                        {values.domains.map((name, i) => (
                          <MenuItem
                            key={i}
                            value={name}
                            sx={{
                              "&.Mui-selected": {
                                backgroundImage:
                                  "linear-gradient(-15deg, #fdfcfb 0%, #efe7fa 10%)",
                                borderRadius: 5,
                                mx: 1,
                              },
                              "&:hover": {
                                backgroundImage:
                                  "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
                                borderRadius: 5,
                                transition: "transform 0.5s",
                                transform: "scale(1.05)",
                                mx: 1,
                              },
                            }}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </TextFieldX>
                    </Stack>

                    <Grid
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ px: 1, mt: 2 }}
                    >
                      <LoadingButton
                        type="submit"
                        disabled={
                          JSON.stringify(touched) === "{}" ||
                          JSON.stringify(errors) !== "{}" ||
                          isSubmitting
                        }
                        loading={isSubmitting}
                        loadingIndicator={
                          <Stack spacing={1} direction="row">
                            <Typography variant="subtitle2">ADDING</Typography>
                            <CircularProgress size={20} />
                          </Stack>
                        }
                        variant="outlined"
                        sx={{
                          borderRadius: 5,
                          borderStyle: "double",
                          borderWidth: 4,
                          "&:hover": {
                            borderStyle: "double",
                            borderWidth: 4,
                            boxShadow: "rgba(52, 117, 210, 0.5) 0px 30px 90px",
                          },
                        }}
                      >
                        ADD USER
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

{
  /* <TextFieldWrapper>
                      <CustomFormControl
                        variant="filled"
                        size="small"
                        fullWidth
                        error={touched.domain && Boolean(errors.domain)}
                      >
                        <InputLabel>Domain</InputLabel>
                        <Select {...getFieldProps("domain")}>
                          {values.domains.map((name, i) => (
                            <MenuItem
                              key={i}
                              value={name}
                              sx={{
                                "&.Mui-selected": {
                                  backgroundImage:
                                    "linear-gradient(-15deg, #fdfcfb 0%, #efe7fa 10%)",
                                  borderRadius: 5,
                                  mx: 1,
                                },
                                "&:hover": {
                                  backgroundImage:
                                    "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
                                  borderRadius: 5,
                                  transition: "transform 0.5s",
                                  transform: "scale(1.05)",
                                  mx: 1,
                                },
                              }}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {touched.domain && errors.domain}
                        </FormHelperText>
                      </CustomFormControl>
                    </TextFieldWrapper> */
}
