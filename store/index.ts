import create from "zustand";

import { devtools, persist } from "zustand/middleware";

//enum Status {warning = 2, error = 3, success = 0, info = 1}

interface useAlertStore {
  isOpen: boolean;
  status?: string;
  subject: string;
  body: string;
  alert: ({
    status,
    subject,
    body,
  }: {
    status?: string;
    subject: string;
    body: string;
  }) => void;
}

interface useUserStore {
  isOpen: boolean;
  toggle: () => void;
}

interface useModalStore {
  isOpen: boolean;
  toggle: () => void;
}

interface useSnackBarStore {
  isOpen: boolean;
  message: any;
  notify: ({ message }: { message: string }) => void;
}

interface useThemeStore {
  theme: any;
  changeMode: (mode: string) => void;
}

export const useAlertStore = create<useAlertStore>((set) => ({
  isOpen: false,
  status: "warning",
  subject: "",
  body: "",
  alert: ({ status, subject, body }) =>
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
      status: !status ? state.status : status,
      subject,
      body,
    })),
}));

export const useUserStore = create<useUserStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useModalStore = create<useModalStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useSnackBarStore = create<useSnackBarStore>((set) => ({
  isOpen: false,
  message: "",
  notify: ({ message }) =>
    set((state) => ({ ...state, isOpen: !state.isOpen, message })),
}));

export const useThemeStore = create<useThemeStore>((set) => ({
  theme: {
    palette: {
      mode: "dark", // light dark
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
  },
  changeMode: (mode) =>
    set((state) => ({ ...state, theme: (state.theme.palette.mode = mode) })),
}));
