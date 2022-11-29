import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Unstable_Grid2";

import { useAlertStore, useUserStore } from "../../store";
import countries from "../../store/countries.json";

import { queryClient } from "../../pages/_app";
import ReusableModal from "./ReusableModal";

import { TextFieldX } from "../InputFields/TextField";
import { LoadingButtonX } from "../InputFields/LoadingButton";

import { MdAccountCircle, MdOutlineDomain } from "react-icons/md";
import React from "react";

export default function AddUser() {
  // ? Client state definitions
  const handleClose = useUserStore((state) => state.toggle);
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state definitions
  const { mutate: addStore } = useMutation((body) =>
    axios.post("stores", body)
  );

  return (
    <ReusableModal title="Add store">
      <Formik
        initialValues={{
          code: "",
          name: "",
          client: "",
          country: {
            label: "",
          },
        }}
        validationSchema={Yup.object({
          code: Yup.string().max(20, "Max of 20 chars").required("Required"),
          name: Yup.string().max(20, "Max of 20 chars").required("Required"),
          client: Yup.string().required("Required"),
          country: Yup.object({
            label: Yup.string().required("Required"),
            code: Yup.string().required("Required"),
            phone: Yup.string().required("Required"),
          }),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          //@ts-ignore
          addStore(values, {
            onSuccess: (data) => {
              resetForm();
              handleClose();
              queryClient.setQueryData(["Stores"], (prev: any) => ({
                ...prev,
                data: {
                  ...prev.data,
                  rows: [data.data, ...prev.data.rows],
                },
              }));
            },
            onError: (error: any) => {
              setSubmitting(false);
              showAlert({
                status: error.response.data.status,
                subject: error.response.data.subject,
                body: error.response.data.body,
              });
            },
          })
        }
      >
        {({
          values,
          errors,
          touched,
          getFieldProps,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <Grid container rowSpacing={2} columnSpacing={-4}>
              <Autocomplete
                options={countries}
                autoHighlight
                /* getOptionLabel={(option: { label: string }) =>
                  countries[
                    countries.findIndex(
                      (country) => country.label === option.label
                    )
                  ]?.label || "Kenya"
                } */
                //freeSolo
                value={values.country.label}
                onChange={(event, value) =>
                  value ? (values.country = value) : (values.country = {})
                }
                groupBy={(option) =>
                  option.suggested ? "Quick suggestions" : null
                }
                size="small"
                fullWidth
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextFieldX
                    {...params}
                    label="Country"
                    placeholder="Search and select country"
                    error={touched[":r1:"] && Boolean(errors.country?.label)}
                    helperText={touched[":r1:"] && errors.country?.label}
                    onBlur={handleBlur}
                  />
                )}
              />

              <TextFieldX
                label="Code *"
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
                prefixcon={values.country.code}
                columnspan={5}
                {...getFieldProps("code")}
              />

              <TextFieldX
                children={undefined}
                label="Name *"
                placeholder="Enter Name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                prefixcon={<MdAccountCircle size={24} />}
                columnspan={7}
                {...getFieldProps("name")}
              />

              <TextFieldX
                label="Client *"
                error={touched.client && Boolean(errors.client)}
                select
                helperText={touched.client && errors.client}
                //prefixcon={<MdOutlineDomain size={24} />}
                {...getFieldProps("client")}
              >
                {["LC Waikiki", "QWE"].map((client: string, i: number) => (
                  <MenuItem
                    key={i}
                    value={client}
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
                    {client}
                  </MenuItem>
                ))}
              </TextFieldX>
            </Grid>

            <LoadingButtonX
              type="submit"
              placement="center"
              disabled={
                JSON.stringify(touched) === "{}" ||
                JSON.stringify(errors) !== "{}" ||
                isSubmitting
              }
              loading={isSubmitting}
            >
              ADD STORE
            </LoadingButtonX>
          </Form>
        )}
      </Formik>
    </ReusableModal>
  );
}
