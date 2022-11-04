import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
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
