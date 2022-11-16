import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAlertStore, useUserStore } from "../../store";
import { customTheme } from "../../utils/theme";
import { TextFieldX } from "../InputFields/TextField";
import { CloseButtonX } from "../InputFields/CloseButton";
import { queryClient } from "../../pages/_app";

import {
  MdAccountCircle,
  MdAttachEmail,
  MdOutlineDomain,
} from "react-icons/md";

export default function ReusableModal(props) {
  // ? Client state definitions
  const handleClose = useUserStore((state) => state.toggle);
  const showAlert = useAlertStore((state) => state.alert);

  // ? Server state definitions
  const { mutate } = useMutation((body) => axios.post("Users", body));

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={useUserStore((state) => state.isOpen)}>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            left: "50%",
            maxWidth: "300px",
            overflow: "hidden",
            pb: 2,
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            zIndex: "9999",
            outline: 0,
          }}
        >
          <svg
            viewBox="0 250 300 300"
            width="100%"
            height="380"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{ position: "absolute", zIndex: -1 }}
          >
            <path
              d="M0 447L16.7 425.5C33.3 404 66.7 361 100 358.3C133.3 355.7 166.7 393.3 200 385.7C233.3 378 266.7 325 300 314.7C333.3 304.3 366.7 336.7 400 355.2C433.3 373.7 466.7 378.3 500 371.2C533.3 364 566.7 345 600 338.5C633.3 332 666.7 338 700 367.3C733.3 396.7 766.7 449.3 800 431C833.3 412.7 866.7 323.3 883.3 278.7L900 234L900 0L883.3 0C866.7 0 833.3 0 800 0C766.7 0 733.3 0 700 0C666.7 0 633.3 0 600 0C566.7 0 533.3 0 500 0C466.7 0 433.3 0 400 0C366.7 0 333.3 0 300 0C266.7 0 233.3 0 200 0C166.7 0 133.3 0 100 0C66.7 0 33.3 0 16.7 0L0 0Z"
              fill="#0066FF"
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
          </svg>

          <Grid container>
            <Grid item xs={12}>
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
                  {props.title}
                </Typography>
                {/*@ts-ignore*/}
                <CloseButtonX onClick={handleClose} />
              </Stack>
              {props.children}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
