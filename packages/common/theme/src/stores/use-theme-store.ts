import { create } from "zustand";
import { Style } from "../constants";
import { ThemeColor } from "../colors";

type iThemeSore = {
  style: Style["name"];
  theme: ThemeColor["name"];
  radius: number;
  setTheme: (theme: ThemeColor["name"]) => void;
  setStyle: (style: Style["name"]) => void;
  setRadius: (radius: number) => void;
};

export const useThemeStore = create<iThemeSore>(set => ({
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
  setTheme: (theme: ThemeColor["name"]) => set({ theme }),
  setStyle: (style: Style["name"]) => set({ style }),
  setRadius: (radius: number) => set({ radius }),
}));
