import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { motion } from "framer-motion";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { RiCloseFill } from "react-icons/ri";

const CloseButton = styled(RiCloseFill)({
  color: "white",
  transform: "rotate(90deg)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "rotate(180deg)",
    transition: "transform 0.3s",
  },
});

/* type IconButtonClickProp = { onClick?: React.MouseEvent<HTMLElement> };
type AdditionalIconButtonProps = IconButtonProps & IconButtonClickProp; */

//export const CloseButtonX = (props: AdditionalIconButtonProps) => (
export const LoadingButtonX = (props: any) => (
  <Grid display="flex" justifyContent={props.placement} sx={{ px: 1, pt: 2 }}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      <LoadingButton
        {...props}
        type="submit"
        //fullwidth
        loadingIndicator={
          <Stack spacing={1} direction="row">
            <Typography variant="subtitle2" sx={{ textOverflow: "none" }}>
              {props.loadingtext}
            </Typography>
            <CircularProgress size={20} />
          </Stack>
        }
        variant="outlined"
        sx={{
          borderRadius: 4,
          borderStyle: "double",
          borderWidth: 4,
          boxShadow: "rgba(52, 117, 210, 0.2) 0px 30px 90px",
          "&:hover": {
            borderStyle: "double",
            borderWidth: 4,
            boxShadow: "rgba(2, 87, 210, 0.3) 0px 30px 90px",
          },
          //width: "90%",
        }}
      >
        {props.children}
      </LoadingButton>
    </motion.div>
  </Grid>
);
