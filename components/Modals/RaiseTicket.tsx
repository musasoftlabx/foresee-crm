// * Material UI imports
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// * React Icons imports
import { FcWorkflow, FcSignature, FcHeatMap } from "react-icons/fc";

// * Extra Packages imports
import * as Yup from "yup";
import { FilePond, registerPlugin } from "react-filepond";
import { Formik, Form } from "formik";
import { getCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// * Project Components imports
import { TextFieldX } from "../InputFields/TextFieldX";
import { LoadingButtonX } from "../InputFields/LoadingButtonX";
import ReusableModal from "./ReusableModal";
import { useAlertStore, useModalStore } from "../../store";

// * CSS imports
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// * Register FilePond plugins
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

// * Type definitions
interface IRaiseTicket {
  categories: any;
  store: string;
  setTickets: any;
}

const RaiseTicket = ({ categories, store, setTickets }: IRaiseTicket) => {
  // ? Client state definitions
  const handleClose = useModalStore((state) => state.toggle);
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state mutation(s)
  const { mutate: raiseTicket } = useMutation((body) =>
    axios.post("tickets", body)
  );
  const { mutate: deleteFile } = useMutation((file) =>
    axios.delete(`upload/${file}`)
  );

  return (
    <ReusableModal title="Raise a ticket">
      <Formik
        initialValues={{
          category: "",
          subcategory: "",
          details: "",
          multiUpload: true,
          maxFiles: 5,
          files: [],
        }}
        validationSchema={Yup.object({
          category: Yup.string().required("Required."),
          subcategory: Yup.string().required("Required."),
          details: Yup.string().max(100, "Must be {max} characters or less."),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const files = values.files.map(
            ({ serverId }) =>
              `${process.env.API}public/images/snapshots/${serverId}`
          );
          raiseTicket(
            //@ts-ignore
            { ...values, store, files },
            {
              onSuccess: (data) => {
                resetForm();
                handleClose();
                setTickets((prev: any) => ({
                  ...prev,
                  rows: [data.data, ...prev.rows],
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
            }
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          getFieldProps,
          setFieldValue,
        }) => (
          <Form>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, .8) !important", ml: 3, mb: 2 }}
            >
              ▸ Images you would like to upload
            </Typography>

            {/* {values.files.length > 0 ? (
              <style jsx global>
                {`
                  .filepond--root {
                    overflow: auto !important;
                  }
                `}
              </style>
            ) : (
              <style jsx global>
                {`
                  .filepond--root {
                    overflow: hidden !important;
                  }
                `}
              </style>
            )} */}

            <FilePond
              files={values.files}
              onprocessfile={(error, file: any) => {
                if (error) return false;
                setFieldValue("files", [...values.files, file]);
              }}
              onremovefile={(error, { id }: { id: string }) => {
                if (error) return false;
                setFieldValue("files", [
                  ...values.files.filter((file: any) => file.id !== id && file),
                ]);
              }}
              allowMultiple={values.multiUpload}
              maxFiles={values.maxFiles}
              acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
              maxFileSize="5MB"
              maxTotalFileSize="20MB"
              imageValidateSizeMaxWidth={5000}
              name="files"
              server={{
                url: `${process.env.API}`,
                process: {
                  url: "upload",
                  method: "POST",
                  withCredentials: false,
                  headers: {
                    Authorization: `Bearer ${getCookie("__aT")}`,
                  },
                  timeout: 7000,
                  onload: (data) => JSON.parse(data).files.newFilename,
                  onerror: ({ type: status, body }) =>
                    showAlert({ status, subject: "Upload error", body }),
                },
                revert: (file, load, error) => {
                  deleteFile(file, {
                    onSuccess: () => load(),
                    onError: () => error("oh my goodness"),
                  });
                },
              }}
              labelIdle={`
                <div style="cursor:pointer; margin: 20px 0px;">
                  <div style="display: flex; justify-content: center; height: 35px; text-align: center">
                    <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                      <g fill="#FF9800">
                        <rect x="36.1" y="8.1" transform="matrix(.707 .707 -.707 .707 21.201 -25.184)" width="9.9" height="9.9"/>
                        <rect x="36" y="8" width="10" height="10"/>
                      </g>
                      <circle fill="#FFEB3B" cx="41" cy="13" r="3"/>
                      <polygon fill="#2E7D32" points="16.5,18 0,42 33,42"/>
                      <polygon fill="#4CAF50" points="33.6,24 19.2,42 48,42"/>
                    </svg>
                  </div>
                  <div style="font-size: 15px; font-weight: 600; color: #121212; opacity: .7">Upload file${
                    values.multiUpload
                      ? "s {" +
                        values.files.length +
                        "/" +
                        values.maxFiles +
                        "}"
                      : ""
                  } </div>
                  <div style="font-size: 11px; font-weight: 600;">Only JPG, JPEG, PNG allowed</div>
                  ${
                    values.multiUpload
                      ? '<div style="margin: 0 10px 10px 10px; font-size: 15px; text-decoration: underline">Add Files</div>'
                      : ""
                  }
                </div>`}
            />

            <Grid container sx={{ px: 2 }}>
              <TextFieldX
                label="Category *"
                columnspan={{ xs: 12 }}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
                select
                inputProps={{ multiple: false }}
                prefixcon={<FcWorkflow size={24} />}
                name="category"
                onChange={(e) => {
                  setFieldValue("category", e.target.value);
                  setFieldValue("subcategory", "");
                }}
                onBlur={handleBlur}
                value={values.category}
              >
                {categories &&
                  categories.map(
                    (category: { category: string }, i: number) => (
                      <MenuItem key={i} value={category.category}>
                        {/* <FcWorkflow
                          size={20}
                          style={{ marginRight: 10, marginTop: -2 }}
                        /> */}
                        {category.category}
                      </MenuItem>
                    )
                  )}
              </TextFieldX>

              {values.category && (
                <TextFieldX
                  label="Sub-Category *"
                  columnspan={{ xs: 12 }}
                  error={touched.subcategory && Boolean(errors.subcategory)}
                  helperText={touched.subcategory && errors.subcategory}
                  select
                  inputProps={{ multiple: false }}
                  prefixcon={<FcHeatMap size={24} />}
                  {...getFieldProps("subcategory")}
                >
                  {categories &&
                    categories[
                      categories.findIndex(
                        (item: { category: string }) =>
                          item.category === values.category
                      )
                    ]?.subcategories.map((subcategory: string, i: number) => (
                      <MenuItem key={i} value={subcategory}>
                        {subcategory}
                      </MenuItem>
                    ))}
                </TextFieldX>
              )}

              <TextFieldX
                label="Extra Details (Optional)"
                multiline
                rows={3}
                prefixcon={<FcSignature size={24} />}
                error={touched.details && Boolean(errors.details)}
                helperText={`${values.details.length} chars.`}
                {...getFieldProps("details")}
              />

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
                RAISE TICKET
              </LoadingButtonX>
            </Grid>
          </Form>
        )}
      </Formik>
    </ReusableModal>
  );
};

export default RaiseTicket;
