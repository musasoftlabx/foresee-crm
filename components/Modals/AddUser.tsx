import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";

import { useAlertStore, useUserStore } from "../../store";
import { TextFieldX } from "../InputFields/TextFieldX";
import { queryClient } from "../../pages/_app";

import {
  MdAccountCircle,
  MdAttachEmail,
  MdOutlineDomain,
} from "react-icons/md";

import {
  FcFeedback,
  FcAddressBook,
  FcBusinessman,
  FcNightPortrait,
  FcDepartment,
} from "react-icons/fc";
import ReusableModal from "./ReusableModal";
import { LoadingButtonX } from "../InputFields/LoadingButtonX";

export default function AddUser({ domains }: { domains: string[] }) {
  // ? Client state definitions
  const handleClose = useUserStore((state) => state.toggle);
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state definitions
  const { mutate } = useMutation((body) => axios.post("Users", body));

  return (
    <ReusableModal title="Add user">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          emailAddress: "",
          domain: "",
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
        onSubmit={(values, { setSubmitting, resetForm }) =>
          //@ts-ignore
          mutate(values, {
            onSuccess: (data) => {
              handleClose();
              resetForm();
              queryClient.setQueryData(["Users"], (prev: any) => ({
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
            onSettled: (data, error, variables, context) => {},
          })
        }
      >
        {({ errors, touched, getFieldProps, isSubmitting }) => (
          <Form>
            <Grid container sx={{ px: 2 }}>
              <TextFieldX
                label="First Name *"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                prefixcon={<FcNightPortrait size={24} />}
                {...getFieldProps("firstName")}
              />

              <TextFieldX
                label="Last Name *"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                prefixcon={<FcNightPortrait size={24} />}
                {...getFieldProps("lastName")}
              />

              <TextFieldX
                label="Email Address *"
                error={touched.emailAddress && Boolean(errors.emailAddress)}
                helperText={touched.emailAddress && errors.emailAddress}
                prefixcon={<FcAddressBook size={24} />}
                {...getFieldProps("emailAddress")}
              />

              <TextFieldX
                label="Domain *"
                error={touched.domain && Boolean(errors.domain)}
                helperText={touched.domain && errors.domain}
                select
                prefixcon={<FcDepartment size={24} />}
                {...getFieldProps("domain")}
              >
                {domains &&
                  domains.data.map((domain: string, i: number) => (
                    <MenuItem key={i} value={domain}>
                      {domain}
                    </MenuItem>
                  ))}
              </TextFieldX>

              <LoadingButtonX
                type="submit"
                placement="center"
                disabled={
                  JSON.stringify(touched) === "{}" ||
                  JSON.stringify(errors) !== "{}" ||
                  isSubmitting
                }
                loading={isSubmitting}
                loadingtext="PROCESSING..."
              >
                ADD USER
              </LoadingButtonX>
            </Grid>
          </Form>
        )}
      </Formik>
    </ReusableModal>
  );
}
