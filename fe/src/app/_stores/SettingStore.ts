import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "light" | "dark" | "pastel";

interface SettingState {
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      themeName: "light",
      setTheme: (theme) => set({ themeName: theme }),
    }),
    {
      name: "setting-store-theme",
    }
  )
);