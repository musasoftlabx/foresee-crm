import { useUserStore } from "../../store";
import { customTheme } from "../../utils/theme";
import { TextFieldX } from "../InputFields/TextField";

import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import axios from "axios";

import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";

export default function AddUser() {
  const handleOpen = useUserStore((state: any) => state.toggle);

  const {
    mutate,
    isLoading: mutationLoading,
    isSuccess: mutationSuccess,
    isError: mutationError,
  } = useMutation((data) => axios.post("users", data));

  const style = {
    backgroundColor: "#fff",
    borderRadius: "20px",
    //borderTop: `1px solid ${gradients[status][1]}`,
    left: "50%",
    maxWidth: "300px",
    overflow: "hidden",
    px: 3,
    pt: 3,
    pb: 2,
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    zIndex: "9999",
  };

  const handleClose = useUserStore((state) => state.toggle);

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={useUserStore((state) => state.isOpen)} onClose={handleClose}>
        <Box sx={style}>
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
                {JSON.stringify(touched)}
                {isSubmitting.toString()}
                <Grid container>
                  <Grid xs>
                    <Typography variant="h6" sx={{ mb: -0.5 }}>
                      Add user
                    </Typography>

                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <TextFieldX
                        label="First Name *"
                        variant="filled"
                        fullWidth
                        size="small"
                        {...getFieldProps("firstName")}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />

                      <TextFieldX
                        label="Last Name *"
                        variant="filled"
                        fullWidth
                        size="small"
                        {...getFieldProps("lastName")}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />

                      <TextFieldX
                        label="Email Address *"
                        variant="filled"
                        fullWidth
                        size="small"
                        {...getFieldProps("emailAddress")}
                        error={
                          touched.emailAddress && Boolean(errors.emailAddress)
                        }
                        helperText={touched.emailAddress && errors.emailAddress}
                      />

                      <TextFieldX
                        label="Domain *"
                        variant="filled"
                        fullWidth
                        select
                        size="small"
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

                      <Grid sx={{ px: 1, mt: 3 }}>
                        <LoadingButton
                          type="submit"
                          size="large"
                          // @ts-ignore
                          disabled={
                            JSON.stringify(touched) === "{}" ||
                            JSON.stringify(errors) !== "{}" ||
                            isSubmitting
                          }
                          loading={isSubmitting}
                          loadingIndicator={
                            <Stack spacing={1} direction="row">
                              <Typography variant="subtitle2">
                                ADDING
                              </Typography>
                              <CircularProgress size={20} />
                            </Stack>
                          }
                          variant="outlined"
                        >
                          ADD USER
                        </LoadingButton>
                      </Grid>
                    </Stack>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Button onClick={handleOpen}>open</Button>
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
