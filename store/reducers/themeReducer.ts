import { createSlice } from "@reduxjs/toolkit";

interface themeMode {
  mode: "dark" | "light";
  type: "dark" | "light" | "system";
}

const systemTheme = window && window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

const initialState: themeMode = {
  mode: systemTheme,
  type: "system",
};

const userThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: "dark" | "light" | "auto" }) => {
      switch (payload) {
        case "light":
          state.mode = "light";
          state.type = "light";
          break;
        case "dark":
          state.mode = "dark";
          state.type = "dark";
          break;
        case "auto":
          state.mode = systemTheme;
          state.type = "system";
          break;

        default:
          break;
      }
    },
    resetPreferences: (state) => {
      state.mode = systemTheme;
      state.type = "system";
    },
  },
});

export const { setTheme, resetPreferences } = userThemeSlice.actions;

export const UserThemePreferences = userThemeSlice.reducer;
