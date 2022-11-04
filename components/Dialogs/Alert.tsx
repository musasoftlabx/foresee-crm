import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { BsPatchCheck } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FaServer } from "react-icons/fa";

import styles from "../../styles/Alert.module.css";
import { useAlertStore } from "../../store";

interface Gradients {
  success: String[];
  info: String[];
  warning: String[];
  error: String[];
}

const gradients: Gradients = {
  success: ["#00b09b", "#96c93d"],
  info: ["#fc00ff", "#00dbde"],
  warning: ["#f12711", "#f5af19"],
  error: ["#93291E", "#ED213A"],
};

export default function Alert() {
  const [status, setStatus] = useState("warning");
  const [subject, setSubject] = useState("Alert Subject");
  const [body, setBody] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  );

  const handleClose = useAlertStore((state) => state.toggle);

  useEffect(() => {}, []);

  const style = {
    backgroundColor: "#fff",
    borderRadius: "20px",
    borderTop: `1px solid ${gradients[status][1]}`,
    left: "50%",
    maxWidth: "300px",
    overflow: "hidden",
    px: 3,
    pt: 3,
    pb: 2,
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    zIndex: "9999",
  };

  const Icon = () => {
    switch (status) {
      case "info":
        return (
          <HiOutlineInformationCircle
            style={{ color: "#fff", fontSize: "36px" }}
          />
        );
        break;
      case "warning":
        return <IoWarningOutline style={{ color: "#fff", fontSize: "36px" }} />;
        break;
      case "error":
        return <FaServer style={{ color: "#fff", fontSize: "36px" }} />;
        break;
      default:
        return <BsPatchCheck style={{ color: "#fff", fontSize: "36px" }} />;
    }
  };

  return (
    <div>
      {/*  <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Modal
        open={useAlertStore((state) => state.isOpen)}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className={styles.dividerTop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="0%" stopColor={gradients[status][1]}></stop>
                  <stop offset="100%" stopColor={gradients[status][0]}></stop>
                </linearGradient>
              </defs>
              <path
                className={styles.dividerFill}
                d="M0,33.886L13.281,0L62.225,67.779L88.288,45.436L140,3.886L100,100L0,100L0,33.886z"
                style={{ fillOpacity: 0.2 }}
              />
              <path
                className={styles.dividerFill}
                //d="M0,48.8L10.938,44.6L35.196,65.112L62.225,47L89.063,68.844L100,64.8L100,100L0,100L0,64.8z"
                d="M0,53.8L20.938,44.6L20,55.112L54.225,57L399.063,0.844L100,64.8L100,100L0,100L0,64.8z"
              />
            </svg>
          </div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Icon />

            <Typography sx={{ color: "#fff", fontWeight: "bold" }} variant="h6">
              {subject}
            </Typography>

            <Typography sx={{ pb: 2, pt: 9 }} variant="body2">
              {body}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={handleClose} autoFocus color={status}>
              OK
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
