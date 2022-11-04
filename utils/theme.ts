import { createTheme } from "@mui/material/styles";
import { palette } from "@mui/system";

const theme = createTheme();

export const customTheme = createTheme({
  typography: {
    fontFamily: "Rubik",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 15,
          marginTop: 5,
        },
        elevation: {
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
        },
      },
    },
  },
});
