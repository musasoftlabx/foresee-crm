import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlineLocalOffer, MdOutlineStickyNote2 } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaTheaterMasks } from "react-icons/fa";
import { GiAlarmClock, GiNotebook } from "react-icons/gi";
import { CgCalendarDates } from "react-icons/cg";
import { HiOutlineIdentification } from "react-icons/hi";
import { VscTelescope } from "react-icons/vsc";
import {
  RiSubtractLine as DeleteIcon,
  RiAddFill as AddIcon,
} from "react-icons/ri";

// * Project Components imports
import { useAlertStore, useConfirmStore, useThemeStore } from "../store";

// * Project Components imports
import AppDrawer from "../components/AppDrawer";
import { TextFieldX } from "../components/InputFields/TextFieldX";
import { TextAreaX } from "../components/InputFields/TextAreaX";
import { LoadingButtonX } from "../components/InputFields/LoadingButtonX";
import ViewQuote from "../components/Modals/ViewQuote";
import Confirm from "../components/Dialogs/Confirm";

const Quotation = ({ theme }: { theme: any }) => {
  const router = useRouter();
  const {
    query: { _ },
  } = router;

  const [quoteURL, setQuoteURL] = useState("");
  const [viewQuote, setViewQuote] = useState(false);

  const [date, setDate] = useState<Dayjs | null>(dayjs());

  // ? Client state definitions
  const showAlert = useAlertStore((state) => state.alert);
  const showConfirm = useConfirmStore((state) => state.alert);
  const handleClose = useConfirmStore((state) => state.close);

  // ? Server state definitions
  const { mutate, isSuccess, isError, isLoading } = useMutation((body) =>
    axios.post("quotation", body)
  );

  const { mutate: sendMail } = useMutation((body) =>
    axios.put("quotation", body)
  );

  isLoading &&
    toast.info("Preparing & generating quotation", {
      toastId: "loading",
      isLoading: true,
    });

  return (
    <AppDrawer>
      <Confirm
        handleConfirm={() => {
          toast.info("Sending Mail to client", {
            toastId: "loading",
            isLoading: true,
          });

          handleClose();
          setViewQuote(false);

          sendMail(
            //@ts-ignore
            { _ },
            {
              onSuccess: () =>
                toast.update("loading", {
                  type: toast.TYPE.SUCCESS,
                  isLoading: false,
                  autoClose: 1000,
                  render: "Mail sent succesfully",
                  onClose: () => router.back(),
                }),
              onError: (error: any) => {
                showAlert({
                  status: error.response.data.status,
                  subject: error.response.data.subject,
                  body: error.response.data.body,
                });
                toast.dismiss("loading");
              },
            }
          );
        }}
        theme={theme}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        theme={theme.palette.mode}
      />

      <ViewQuote
        viewQuote={viewQuote}
        setViewQuote={setViewQuote}
        url={quoteURL}
        beforeClose={() =>
          showConfirm({
            status: "info",
            subject: "Confirm send",
            body: "Proceed to send the quote to the client now?",
          })
        }
      />

      <Formik
        initialValues={{
          offerDate: date,
          issue: "",
          solution: "",
          warranty: "",
          timeframe: "",
          notes: "",
          workDetails: [
            {
              work: "",
              brand: "",
              quantity: "1",
              price: "",
            },
          ],
        }}
        validationSchema={Yup.object({
          issue: Yup.string()
            .max(50, "Max ${max} chars.")
            .required("Required."),
          solution: Yup.string()
            .trim()
            .max(100, "Max ${max} chars.")
            .required("Required."),
          warranty: Yup.string().trim(),
          timeframe: Yup.string().trim(),
          notes: Yup.string().trim().max(200, "Max ${max} chars."),
          workDetails: Yup.array().of(
            Yup.object().shape({
              work: Yup.string().required("Required."),
              brand: Yup.string().required("Required."),
              quantity: Yup.number().min(1, "Min ${min}").required("Required."),
              price: Yup.number().min(1, "Min ${min}").required("Required."),
            })
          ),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          mutate(
            //@ts-ignore
            { ...values, _ },
            {
              onSuccess: ({ data: { url } }) => {
                resetForm({
                  values: {
                    offerDate: date,
                    issue: "",
                    solution: "",
                    warranty: "",
                    timeframe: "",
                    notes: "",
                    workDetails: [
                      {
                        work: "",
                        brand: "",
                        quantity: "1",
                        price: "",
                      },
                    ],
                  },
                });

                toast.update("loading", {
                  type: toast.TYPE.SUCCESS,
                  isLoading: false,
                  autoClose: 1000,
                  render: "Quotation was created succesfully",
                  onClose: () => {
                    setQuoteURL(url);
                    setViewQuote(true);
                  },
                });
              },
              onError: (error: any) => {
                showAlert({
                  status: error.response.data.status,
                  subject: error.response.data.subject,
                  body: error.response.data.body,
                });
                toast.dismiss("loading");
              },
              onSettled: () => setSubmitting(false),
            }
          );
        }}
      >
        {({ values, errors, touched, getFieldProps, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid display="flex" flexDirection="column" xs={12} sx={{ p: 1 }}>
                <Typography variant="h6">Quotation details</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#808080", ml: 0.2 }}
                >
                  Click to add or remove work entities
                </Typography>
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={date}
                  closeOnSelect
                  disablePast
                  inputFormat="DD.MM.YYYY"
                  onChange={(date) => setDate(date)}
                  renderInput={({ inputRef, inputProps }) => (
                    <TextFieldX
                      ref={inputRef}
                      label="Offer Date *"
                      columnspan={{ xs: 12, sm: 6, md: 3.2, lg: 2.2, xl: 1.5 }}
                      error={touched.offerDate && Boolean(errors.offerDate)}
                      helperText={touched.offerDate && errors.offerDate}
                      prefixcon={<CgCalendarDates size={24} />}
                      {...inputProps}
                    />
                  )}
                />
              </LocalizationProvider>

              <TextFieldX
                label="Issue *"
                columnspan={{ xs: 12, sm: 6, md: 8.8, lg: 5, xl: 3.8 }}
                error={touched.issue && Boolean(errors.issue)}
                helperText={touched.issue && errors.issue}
                prefixcon={<MdOutlineStickyNote2 size={24} />}
                {...getFieldProps("issue")}
              />

              <TextFieldX
                label="Solution *"
                columnspan={{ xs: 12, sm: 6, md: 5.7, lg: 4.8, xl: 3.5 }}
                error={touched.solution && Boolean(errors.solution)}
                helperText={touched.solution && errors.solution}
                prefixcon={<IoMdCheckmarkCircleOutline size={24} />}
                {...getFieldProps("solution")}
              />

              <TextFieldX
                label="Warranty"
                columnspan={{ xs: 12, sm: 6, md: 3, lg: 2, xl: 1.5 }}
                error={touched.warranty && Boolean(errors.warranty)}
                helperText={
                  (touched.warranty && errors.warranty) || "e.g  2 years"
                }
                prefixcon={<FaTheaterMasks size={24} />}
                mask="x$______"
                replacement={{ x: /\d/, $: /^[ ]+$/, _: /^[ A-Za-z]+$/ }}
                {...getFieldProps("warranty")}
              />

              <TextFieldX
                label="Timeframe"
                columnspan={{ xs: 12, sm: 6, md: 3.3, lg: 2.2, xl: 1.6 }}
                error={touched.timeframe && Boolean(errors.timeframe)}
                helperText={
                  (touched.timeframe && errors.timeframe) || "e.g  2 days"
                }
                prefixcon={<GiAlarmClock size={24} />}
                mask="x$______"
                replacement={{ x: /\d/, $: /^[ ]+$/, _: /^[ A-Za-z]+$/ }}
                {...getFieldProps("timeframe")}
              />

              <TextAreaX
                label="Notes (Optional)"
                columnspan={{ xs: 12 }}
                multiline
                rows={3}
                error={touched.notes && Boolean(errors.notes)}
                helperText={
                  (touched.notes && errors.notes) ||
                  `${values.notes.length} chars`
                }
                prefixcon={<GiNotebook size={24} />}
                {...getFieldProps("notes")}
              />

              <Grid
                display="flex"
                flexDirection="column"
                xs={12}
                sx={{ mt: 3, px: 1 }}
              >
                <Typography variant="h6">Work details</Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "#808080", ml: 0.2 }}
                >
                  Click + to add x to remove work entities
                </Typography>
              </Grid>

              <FieldArray name="workDetails">
                {({ insert, remove, push }) => (
                  <>
                    {values.workDetails.length > 0 &&
                      values.workDetails.map((workDetail, index) => (
                        <React.Fragment key={index}>
                          <TextFieldX
                            label={`${index + 1}. Work Scope *`}
                            placeholder="Scope of work done"
                            columnspan={{ xs: 12, md: 3.5, lg: 5, xl: 5 }}
                            prefixcon={<VscTelescope size={24} />}
                            {...getFieldProps(`workDetails.${index}.work`)}
                            error={
                              touched.workDetails?.[index]?.work &&
                              //@ts-ignore
                              Boolean(errors.workDetails?.[index]?.work)
                            }
                            helperText={
                              touched.workDetails?.[index]?.work &&
                              //@ts-ignore
                              errors.workDetails?.[index]?.work
                            }
                          />

                          <TextFieldX
                            label="Brand *"
                            placeholder="Brand that worked on"
                            columnspan={{ xs: 12, md: 3, lg: 3 }}
                            prefixcon={<HiOutlineIdentification size={24} />}
                            {...getFieldProps(`workDetails.${index}.brand`)}
                            error={
                              touched.workDetails?.[index]?.brand &&
                              //@ts-ignore
                              Boolean(errors.workDetails?.[index]?.brand)
                            }
                            helperText={
                              touched.workDetails?.[index]?.brand &&
                              //@ts-ignore
                              errors.workDetails?.[index]?.brand
                            }
                          />

                          <TextFieldX
                            label="Qty *"
                            columnspan={{ xs: 12, md: 1.5, lg: 1 }}
                            {...getFieldProps(`workDetails.${index}.quantity`)}
                            mask="xx"
                            replacement={{ x: /\d/ }}
                            error={
                              touched.workDetails?.[index]?.quantity &&
                              //@ts-ignore
                              Boolean(errors.workDetails?.[index]?.quantity)
                            }
                            helperText={
                              touched.workDetails?.[index]?.quantity &&
                              //@ts-ignore
                              errors.workDetails?.[index]?.quantity
                            }
                          />

                          <TextFieldX
                            label="Price *"
                            prefixcon="KES"
                            {...getFieldProps(`workDetails.${index}.price`)}
                            mask="xxxxx"
                            replacement={{ x: /\d/ }}
                            columnspan={{ xs: 12, md: 2, lg: 1.5, xl: 2 }}
                            error={
                              touched.workDetails?.[index]?.price &&
                              //@ts-ignore
                              Boolean(errors.workDetails?.[index]?.price)
                            }
                            helperText={
                              touched.workDetails?.[index]?.price &&
                              //@ts-ignore
                              errors.workDetails?.[index]?.price
                            }
                          />

                          <Grid
                            display="flex"
                            alignItems="center"
                            justifyContent="space-around"
                            xs={12}
                            md={2}
                            lg={1.5}
                            xl={1}
                            sx={{ p: 1 }}
                          >
                            {values.workDetails.length > 1 && (
                              <IconButton
                                onClick={() => remove(index)}
                                sx={{
                                  background: "rgba(244, 67, 54, 0.3)",
                                  "&:hover": {
                                    background: "rgba(244, 67, 54, 0.5)",
                                  },
                                  border: "5px double rgba(244, 67, 54, 0.3)",
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            )}
                            {index === values.workDetails.length - 1 && (
                              <IconButton
                                onClick={() =>
                                  push({
                                    work: "",
                                    brand: "",
                                    quantity: "1",
                                    price: "",
                                  })
                                }
                                disabled={Boolean(errors.workDetails?.[index])}
                                sx={{
                                  background: "rgba(76, 175, 80, 0.4)",
                                  "&:hover": {
                                    background: "rgba(76, 175, 80, 0.6)",
                                  },
                                  border: "5px double rgba(76, 175, 80, 0.3)",
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <AddIcon color="success" />
                              </IconButton>
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                  </>
                )}
              </FieldArray>

              <LoadingButtonX
                type="submit"
                size="large"
                disabled={
                  JSON.stringify(touched) === "{}" ||
                  JSON.stringify(errors) !== "{}" ||
                  isSubmitting
                }
                loading={isSubmitting}
                loadingtext="SUBMITTING ..."
              >
                PREPARE QUOTATION
              </LoadingButtonX>
            </Grid>
          </Form>
        )}
      </Formik>
    </AppDrawer>
  );
};

export default Quotation;
