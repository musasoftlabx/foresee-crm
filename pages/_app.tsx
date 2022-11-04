import "../styles/globals.css";
import type { AppProps } from "next/app";

import AppDrawer from "../components/AppDrawer";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Alert from "../components/Dialogs/Alert";

import axios from "axios";
axios.defaults.baseURL = "./api/";
axios.defaults.headers.common["Authorization"] = "dwgfewsfwefewfe";
axios.defaults.headers.post["Content-Type"] = "application/json";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    white: PaletteOptions["primary"];
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      mode: "light",
      white: {
        light: "#fff",
        main: "#fff",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
    typography: {
      fontFamily: "Rubik",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Alert />
        <AppDrawer>
          <Component {...pageProps} />
        </AppDrawer>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
