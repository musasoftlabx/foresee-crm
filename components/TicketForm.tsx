import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

import { TextFieldX } from "../components/InputFields/TextField";
import { LoadingButtonX } from "../components/InputFields/LoadingButton";
import { CloseButtonX } from "../components/InputFields/CloseButton";

const TicketForm = ({
  categories,
  open,
  setOpen,
}: {
  categories: any;
  open: boolean;
  setOpen: any;
}) => {
  // ? Server state mutation(s)
  const { mutate: raiseTicket } = useMutation((body) =>
    axios.post("Tickets", body)
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Slide}
      onClose={() => setOpen(false)}
    >
      <Formik
        initialValues={{
          category: "",
          subcategory: "",
          details: "",
        }}
        validationSchema={Yup.object({
          details: Yup.string().max(50, "Must be 50 characters or less"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          raiseTicket(values, {
            onSuccess: (data) => {
              resetForm();
              setOpen(false);
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
        {({ values, errors, touched, isSubmitting, getFieldProps }) => (
          <Form>
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mx: 3, mt: 3 }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "Lobster",
                  fontSize: 26,
                  mt: -0.5,
                }}
              >
                Raise a ticket
              </Typography>
              {/*@ts-ignore*/}
              <CloseButtonX />
            </Stack>

            <Stack spacing={2} sx={{ p: 3 }}>
              <TextFieldX
                label="Category *"
                select
                //prefixcon={<MdOutlineDomain size={24} />}
                {...getFieldProps("category")}
              >
                {categories &&
                  categories.map((category, i) => (
                    <MenuItem key={i} value={category.category}>
                      {category.category}
                    </MenuItem>
                  ))}
              </TextFieldX>

              {values.category && (
                <TextFieldX
                  label="Sub-Category *"
                  error={touched.subcategory && Boolean(errors.subcategory)}
                  select
                  helperText={touched.subcategory && errors.subcategory}
                  //prefixcon={<MdOutlineDomain size={24} />}
                  {...getFieldProps("subcategory")}
                >
                  {categories &&
                    categories[
                      categories.findIndex(
                        (item) => item.category === values.category
                      )
                    ]?.subcategories.map((subcategory: string, i: number) => (
                      <MenuItem
                        key={i}
                        value={subcategory}
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
                        {subcategory}
                      </MenuItem>
                    ))}
                </TextFieldX>
              )}

              <TextFieldX
                label="Extra Details (Optional)"
                multiline
                rows={5}
                //prefixcon={<MdOutlineDomain size={24} />}
                {...getFieldProps("details")}
                helperText={`${values.details.length} chars`}
              >
                {categories &&
                  categories.map((category, i) => (
                    <MenuItem key={i} value={category.category}>
                      {category.category}
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
              >
                ADD USER
              </LoadingButtonX>
            </Stack>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TicketForm;
