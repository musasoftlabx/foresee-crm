import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const customTheme = createTheme({
  /* palette: {
    mode: "light",
    white: {
      light: "#fff",
      main: "#fff",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  }, */
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
