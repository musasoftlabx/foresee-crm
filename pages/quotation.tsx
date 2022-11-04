import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
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

import * as Yup from "yup";

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

const TextFieldWrapper = (props: {
  children: ReactElement<JSXElementConstructor<any>>;
}) => (
  <Grid xs={12} sm={6} md={4} lg={3} sx={{ px: 1, mt: 1 }}>
    {props.children}
  </Grid>
);

const Quotation = (props) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  console.log(props);

  return (
    <>
      <Formik
        initialValues={{
          offerDate: date,
          offerNo: "",
          notes: "",
          issue: "",
          solution: "",
          warranty: "",
          timeframe: "",
          workDetails: [
            {
              work: "",
              brand: "",
              quantity: 1,
              price: 0,
            },
          ],
        }}
        validationSchema={Yup.object({
          offerNo: Yup.string().max(10, "Max of 10 chars").required("Required"),
          issue: Yup.string().max(50, "Max of 50 chars").required("Required"),
          solution: Yup.string().max(50, "Max of 50 chars"),
          warranty: Yup.string().max(10, "Max of 10 chars"),
          timeframe: Yup.string().max(10, "Max of 10 chars"),
          workDetails: Yup.array().of(
            Yup.object().shape({
              work: Yup.string().required("Required."),
              brand: Yup.string().required("Required."),
              quantity: Yup.string().required("Required."),
              price: Yup.string().required("Required."),
            })
          ),
        })}
        onSubmit={async (values, actions) => {
          const request = await fetch("/api/quotation/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const data = request.json();

          actions.setSubmitting(false);

          actions.resetForm({
            values: {
              offerDate: null,
              offerNo: "",
              notes: "",
              issue: "",
              solution: "",
              warranty: "",
              timeframe: "",
              workDetails: [
                {
                  work: "",
                  brand: "",
                  quantity: 1,
                  price: 0,
                },
              ],
            },
          });
        }}
      >
        {({ values, errors, touched, getFieldProps, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid xs>
                <Typography variant="h6" sx={{ mb: -0.5 }}>
                  Quotation details
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "#808080", ml: 0.3 }}
                >
                  Click to add or remove work entities
                </Typography>

                <Grid container>
                  <TextFieldWrapper>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        value={date}
                        closeOnSelect
                        disablePast
                        inputFormat="DD.MM.YYYY"
                        onChange={(date) => setDate(date)}
                        renderInput={({ inputRef, inputProps }) => (
                          //@ts-ignore
                          <CustomTextField
                            ref={inputRef}
                            {...inputProps}
                            label="Offer Date"
                            variant="filled"
                            fullWidth
                            size="small"
                            error={
                              touched.offerDate && Boolean(errors.offerDate)
                            }
                            helperText={touched.offerDate && errors.offerDate}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </TextFieldWrapper>

                  <TextFieldWrapper>
                    <CustomTextField
                      label="Offer #"
                      variant="filled"
                      fullWidth
                      size="small"
                      {...getFieldProps("offerNo")}
                      error={touched.offerNo && Boolean(errors.offerNo)}
                      helperText={touched.offerNo && errors.offerNo}
                    />
                  </TextFieldWrapper>

                  <TextFieldWrapper>
                    <CustomTextField
                      label="Issue *"
                      variant="filled"
                      fullWidth
                      size="small"
                      {...getFieldProps("issue")}
                      error={touched.issue && Boolean(errors.issue)}
                      helperText={touched.issue && errors.issue}
                    />
                  </TextFieldWrapper>

                  <TextFieldWrapper>
                    <CustomTextField
                      label="Solution"
                      variant="filled"
                      fullWidth
                      size="small"
                      {...getFieldProps("solution")}
                      error={touched.solution && Boolean(errors.solution)}
                      helperText={touched.solution && errors.solution}
                    />
                  </TextFieldWrapper>

                  <TextFieldWrapper>
                    <CustomTextField
                      label="Warranty"
                      variant="filled"
                      fullWidth
                      size="small"
                      {...getFieldProps("warranty")}
                      error={touched.warranty && Boolean(errors.warranty)}
                      helperText={touched.warranty && errors.warranty}
                    />
                  </TextFieldWrapper>

                  <TextFieldWrapper>
                    <CustomTextField
                      label="Timeframe"
                      variant="filled"
                      fullWidth
                      size="small"
                      {...getFieldProps("timeframe")}
                      error={touched.timeframe && Boolean(errors.timeframe)}
                      helperText={touched.timeframe && errors.timeframe}
                    />
                  </TextFieldWrapper>
                </Grid>

                <TextFieldWrapper>
                  <CustomTextField
                    label="Notes (Optional)"
                    variant="filled"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                    {...getFieldProps("notes")}
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                  />
                </TextFieldWrapper>

                <FieldArray name="workDetails">
                  {({ insert, remove, push }) => (
                    <Box sx={{ mt: 5 }}>
                      <Typography variant="h6" sx={{ mb: -0.5 }}>
                        Work details
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: "#808080", ml: 0.3 }}
                      >
                        Click + to add or remove work entities
                      </Typography>

                      {values.workDetails.length > 0 &&
                        values.workDetails.map((workDetail, index) => (
                          <Grid container alignItems="center" key={index}>
                            <Grid xs={12} md={3} lg={5} sx={{ px: 1, mt: 1 }}>
                              <CustomTextField
                                label="Work Scope *"
                                variant="filled"
                                size="small"
                                fullWidth
                                placeholder="Scope of work done"
                                {...getFieldProps(`workDetails.${index}.work`)}
                                error={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].work &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].work
                                }
                                /* helperText={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].work &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].work
                                } */
                              />
                            </Grid>

                            <Grid xs={12} md={3} lg={3} sx={{ px: 1, mt: 1 }}>
                              <CustomTextField
                                label="Brand *"
                                variant="filled"
                                size="small"
                                fullWidth
                                placeholder="Brand that worked on"
                                {...getFieldProps(`workDetails.${index}.brand`)}
                                error={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].brand &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].brand
                                }
                                helperText={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].brand &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].brand
                                }
                              />
                            </Grid>

                            <Grid xs={12} md={2} lg={1} sx={{ px: 1, mt: 1 }}>
                              <CustomTextField
                                label="Quantity *"
                                variant="filled"
                                size="small"
                                fullWidth
                                {...getFieldProps(
                                  `workDetails.${index}.quantity`
                                )}
                                error={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].quantity &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].quantity
                                }
                                helperText={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].quantity &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].quantity
                                }
                              />
                            </Grid>

                            <Grid xs={12} md={2} lg={2} sx={{ px: 1, mt: 1 }}>
                              <CustomTextField
                                label="Price *"
                                variant="filled"
                                size="small"
                                fullWidth
                                {...getFieldProps(`workDetails.${index}.price`)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment
                                      position="start"
                                      sx={{ pt: 0.2, borderBottom: 0 }}
                                    >
                                      KES
                                    </InputAdornment>
                                  ),
                                }}
                                error={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].price &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].price
                                }
                                helperText={
                                  errors &&
                                  errors.workDetails &&
                                  errors.workDetails[index] &&
                                  errors.workDetails[index].price &&
                                  touched &&
                                  touched.workDetails &&
                                  touched.workDetails[index] &&
                                  touched.workDetails[index].price
                                }
                              />
                            </Grid>

                            <Grid xs={12} md={1}>
                              {values.workDetails.length > 1 && (
                                <IconButton
                                  color="error"
                                  sx={{
                                    background: "#ffeeee",
                                    "&:hover": {
                                      background: "#fbdbdb",
                                    },
                                    mt: 1,
                                    mr: 1,
                                  }}
                                >
                                  <DeleteIcon onClick={() => remove(index)} />
                                </IconButton>
                              )}
                              {index === values.workDetails.length - 1 && (
                                <IconButton
                                  sx={{
                                    background: "#f2eff9",
                                    "&:hover": {
                                      background: "#d1d9fc",
                                    },
                                    mt: 1,
                                  }}
                                >
                                  <AddIcon
                                    onClick={() =>
                                      push({
                                        work: "",
                                        brand: "",
                                        quantity: 1,
                                        price: 0,
                                      })
                                    }
                                  />
                                </IconButton>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                    </Box>
                  )}
                </FieldArray>
                <Grid sx={{ px: 1, mt: 5 }}>
                  <LoadingButton
                    type="submit"
                    size="large"
                    // @ts-ignore
                    disabled={errors || isSubmitting}
                    loading={isSubmitting}
                    loadingIndicator="SUBMITTING....."
                    variant="outlined"
                  >
                    CREATE QUOTATION
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Quotation;
