import create from "zustand";

import { devtools, persist } from "zustand/middleware";

export const useAlertStore = create((set) => ({
  isOpen: false,
  //open: () => set((state: any) => ({ counter: state.counter + 1 })),
  toggle: () => set((state: any) => ({ isOpen: !state.isOpen })),
}));

export const useUserStore = create((set) => ({
  isOpen: true,
  toggle: () => set((state: any) => ({ isOpen: !state.isOpen })),
}));

//export default alertStore;
