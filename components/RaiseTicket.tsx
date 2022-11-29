import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import MenuItem from "@mui/material/MenuItem";

import Grid from "@mui/material/Unstable_Grid2";

import { TextFieldX } from "./InputFields/TextField";
import { LoadingButtonX } from "./InputFields/LoadingButton";

import { useAlertStore, useModalStore } from "../store";

import ReusableModal from "./Modals/ReusableModal";

interface RaiseTicket {
  categories: any;
  store: string;
  setTickets: any;
}

const RaiseTicket = ({ categories, store, setTickets }: RaiseTicket) => {
  // ? Client state definitions
  const handleClose = useModalStore((state) => state.toggle);
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state mutation(s)
  const { mutate: raiseTicket } = useMutation((body) =>
    axios.post("tickets", body)
  );

  return (
    <ReusableModal title="Raise a ticket">
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
          raiseTicket(
            //@ts-ignore
            { ...values, store },
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
          )
        }
      >
        {({ values, errors, touched, isSubmitting, getFieldProps }) => (
          <Form>
            <Grid container rowSpacing={2} columnSpacing={-4}>
              <TextFieldX
                label="Category *"
                select
                //prefixcon={<MdOutlineDomain size={24} />}
                {...getFieldProps("category")}
              >
                {categories &&
                  categories.map((category, i: number) => (
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
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  {categories &&
                    categories[
                      categories.findIndex(
                        (item: { category: string }) =>
                          item.category === values.category
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
            </Grid>
          </Form>
        )}
      </Formik>
    </ReusableModal>
  );
};

export default RaiseTicket;
