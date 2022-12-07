// * Material UI imports
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// * Extra Packages imports
import { motion } from "framer-motion";

export const LoadingButtonX = (props: any) => (
  <Grid
    display="flex"
    xs={12}
    justifyContent={props.placement}
    sx={{ px: 1, pt: 2 }}
  >
    <motion.div
      whileHover={!props.disabled ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      <LoadingButton
        type="submit"
        variant="outlined"
        loadingIndicator={
          <Stack spacing={1} direction="row">
            <Typography variant="subtitle2" noWrap>
              {props.loadingtext}
            </Typography>
            <CircularProgress size={20} color="inherit" />
          </Stack>
        }
        sx={{
          borderRadius: 4,
          borderStyle: "double",
          borderWidth: 4,
          boxShadow: "rgba(52, 117, 210, 0.3) 0px 30px 90px",
          "&:hover": {
            borderStyle: "double",
            borderWidth: 4,
            boxShadow: "rgba(2, 87, 210, 0.5) 0px 30px 90px",
          },
          px: 5,
        }}
        {...props}
      >
        {props.children}
      </LoadingButton>
    </motion.div>
  </Grid>
);
