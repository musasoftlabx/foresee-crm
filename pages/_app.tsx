import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getCookie, setCookie } from "cookies-next";

import Alert from "../components/Dialogs/Alert";

import axios from "axios";

axios.defaults.baseURL = process.env.API;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use(
  (req: any) => {
    req.headers.Authorization = `Bearer ${getCookie("__aT")}`;
    return req;
  },
  (err) => Promise.reject(err)
);

declare module "@mui/material/styles" {
  interface PaletteOptions {
    white: PaletteOptions["primary"];
  }
}

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    axios.interceptors.response.use(
      (res: any) => {
        res.data.__aT && setCookie("__aT", res.data.__aT);
        return res;
      },
      (err) => {
        err.response.data.forceLogout && router.push("/login");
        return Promise.reject(err);
      }
    );
  }, []);

  const theme = createTheme({
    palette: {
      mode: "dark",
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
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
