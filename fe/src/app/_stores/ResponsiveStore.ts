import { create } from "zustand";

interface ResponsiveState {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}));