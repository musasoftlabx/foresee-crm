import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import Grid from "@mui/material/Unstable_Grid2";

import { useAlertStore, useUserStore } from "../../store";
import countries from "../../store/countries.json";

import { queryClient } from "../../pages/_app";
import ReusableModal from "./ReusableModal";

import { TextFieldX } from "../InputFields/TextFieldX";
import { LoadingButtonX } from "../InputFields/LoadingButtonX";

import { MdAccountCircle, MdOutlineDomain } from "react-icons/md";
import { FcShop, FcSearch, FcDepartment, FcDisplay } from "react-icons/fc";
import React from "react";
import { InputAdornment, Typography } from "@mui/material";

export default function AddStore({ domains }: { domains: string[] }) {
  // ? Client state definitions
  const handleClose = useUserStore((state) => state.toggle);
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state definitions
  const { mutate } = useMutation((body) => axios.post("stores", body));

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
          mutate(values, {
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
            <Grid container sx={{ px: 2 }}>
              <Autocomplete
                options={countries}
                autoHighlight
                autoComplete
                blurOnSelect
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
                groupBy={({ suggested }: { suggested: string }) =>
                  suggested ? "Quick suggestions" : null
                }
                size="small"
                fullWidth
                renderOption={(
                  props,
                  {
                    label,
                    code,
                    phone,
                  }: { label: string; code: string; phone: string }
                ) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    <Typography variant="body2">
                      {label} ({code}) +{phone}
                    </Typography>
                  </Box>
                )}
                renderInput={(props) => {
                  return (
                    <TextFieldX
                      {...props}
                      label="Country *"
                      columnspan={{ xs: 12 }}
                      placeholder="Search or select country"
                      error={touched[":r1:"] && Boolean(errors.country?.label)}
                      helperText={touched[":r1:"] && errors.country?.label}
                      prefixcon={<FcSearch size={24} />}
                      onBlur={handleBlur}
                      InputProps={{
                        ...props.InputProps,
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{
                              marginTop:
                                (props.inputProps.value ? 0 : -18) +
                                "px !important",
                            }}
                          >
                            <FcSearch size={24} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
              />

              <TextFieldX
                label="Store Code *"
                columnspan={{ xs: 12 }}
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
                mask="xxx"
                replacement={{ x: /\d/ }}
                prefixcon={
                  values.country.code ? (
                    values.country.code
                  ) : (
                    <FcDisplay size={24} />
                  )
                }
                {...getFieldProps("code")}
              />

              <TextFieldX
                label="Store Name *"
                columnspan={{ xs: 12 }}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                prefixcon={<FcShop size={24} />}
                {...getFieldProps("name")}
              />

              <TextFieldX
                label="Client *"
                columnspan={{ xs: 12 }}
                error={touched.client && Boolean(errors.client)}
                helperText={touched.client && errors.client}
                select
                prefixcon={<FcDepartment size={24} />}
                {...getFieldProps("client")}
              >
                {domains &&
                  domains.map((client: string, i: number) => (
                    <MenuItem key={i} value={client}>
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
