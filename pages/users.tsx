import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";

import { useAlertStore } from "../store";
import { TextFieldX } from "../components/InputFields/TextField";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { styled, alpha } from "@mui/material/styles";
import { Formik, Form, FieldArray } from "formik";

import {
  RiDeleteBin5Fill as DeleteIcon,
  RiAddFill as AddIcon,
} from "react-icons/ri";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

//import Fancy from "fancygrid";
import Fancy from "fancygrid/client/fancy.min.js";
//const Fancy = require("fancygrid/client/fancy.min.js");
//import "fancygrid/client/modules/sort.min";
import "fancygrid/client/fancy.min.css";

import * as Yup from "yup";
import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    ":before": {
      borderBottom: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      //boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      //border: `2px dotted ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-error": {
      backgroundColor: "#fff8f8",
      borderBottom: `1px solid ${theme.palette.error.main}`,
    },
  },
  ".MuiFormHelperText-root": {
    textAlign: "right",
    fontWeight: 500,
    lineHeight: 0.5,
    marginRight: 5,
    marginTop: 7,
    opacity: 0.7,
  },
  ".MuiInputBase-adornedStart": {
    ":before": {
      content: "unset",
    },
    ":after": {
      content: "unset",
    },
  },
}));

const CustomFormControl = styled((props: FormControlProps) => (
  <FormControl
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    ":before": {
      borderBottom: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      //boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      //border: `2px dotted ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-error": {
      backgroundColor: "#fff8f8",
      borderBottom: `1px solid ${theme.palette.error.main}`,
    },
  },
  ".MuiFormHelperText-root": {
    textAlign: "right",
    fontWeight: 500,
    lineHeight: 0.5,
    marginRight: 5,
    marginTop: 7,
    opacity: 0.7,
  },
  ".MuiFilledInput-root": {
    ":before": {
      content: "unset",
    },
    ":after": {
      content: "unset",
    },
  },
}));

const TextFieldWrapper = (props: {
  children: ReactElement<JSXElementConstructor<any>>;
}) => (
  <Grid xs={12} sm={6} md={4} lg={3} sx={{ px: 1, mt: 1 }}>
    {props.children}
  </Grid>
);

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 15,
          marginTop: 5,
        },
        elevation: {
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
        },
      },
    },
  },
});

const Users = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log(error);
  };

  const handleOpen = useAlertStore((state: any) => state.toggle);

  const {
    mutate,
    isLoading: mutationLoading,
    isSuccess: mutationSuccess,
    isError: mutationError,
  } = useMutation((data) => axios.post("users", data));

  const exportToCSV = ({}) => {};

  const loader = useRef(false);

  useEffect(() => {
    if (loader.current) {
      loader.current = true;
      Fancy.stylesLoaded = true;
      Fancy.getModulesList();

      var data = [
        {
          name: "Mia",
          surname: "Moore",
          id: 1,
          country: "Netherlands",
          position: "Software Tester",
          email: "mia.moore@fancygrid.com",
        },
        {
          name: "David",
          surname: "Johnson",
          id: 2,
          country: "Belgium",
          position: "Frontend Developer",
          email: "david.johnson@fancygrid.com",
        },
      ];

      const fancyGrid = new Fancy.Grid({
        renderTo: "container",
        height: 500,
        tbar: [
          {
            text: "Export to CSV",
            handler: () => {
              exportToCSV({
                fileName: "Products",
                header: true,
              });
            },
          },
          {
            text: "Refresh",
            handler: () => {
              fancyGrid.load();
            },
          },
        ],
        data: data,
        defaults: {
          sortable: true,
          editable: false,
          resizable: true,
          ellipsis: false,
          filter: {
            header: true,
            emptyText: "Search",
          },
        },
        columns: [
          {
            index: "name",
            title: "Name",
          },
          {
            index: "surname",
            title: "SurName",
          },
          {
            index: "country",
            title: "Country",
          },
          {
            index: "position",
            title: "Position",
          },
          {
            index: "email",
            title: "Email",
          },
        ],
      });
    }
  }, []);

  //const handleSubmit = () => {
  /* const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["todos"],
    () =>
      axios.post("Login/", {
        domain: "4C Technologies Staff",
        username: "mmuliro",
        password: "bXVzYQ==",
      }),
    {
      cacheTime: 5000,
      onSuccess,
      onError,
      select: (data) => {
        return data.brand;
      },
      //refetchInterval: 10000
    }
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message; */

  /* */
  //};

  return (
    <ThemeProvider theme={theme}>
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

                <Grid container>
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
                    error={touched.emailAddress && Boolean(errors.emailAddress)}
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

                  {/* <TextFieldWrapper>
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
                  </TextFieldWrapper> */}
                </Grid>

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
                        <Typography variant="subtitle2">ADDING</Typography>
                        <CircularProgress size={20} />
                      </Stack>
                    }
                    variant="outlined"
                  >
                    ADD USER
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Button onClick={handleOpen}>open</Button>
      <div id="container"></div>
    </ThemeProvider>
  );
};

export default Users;

export async function getStaticProps() {
  //const x = axios.get("users/?domains=true");
  const x = await fetch("http://localhost:3000/api/users?context=domains");
  const y = await x.json();

  return {
    props: {
      domains: null,
    },
  };
}
