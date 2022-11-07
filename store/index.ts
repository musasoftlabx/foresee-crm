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
