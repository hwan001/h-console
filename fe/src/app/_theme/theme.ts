"use client";

import { createTheme } from "@mui/material/styles";

// 기본 테마 설정 (필요에 따라 커스터마이징)
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // MUI 기본 블루
    },
    secondary: {
      main: "#9c27b0", // 보라색
    },
    background: {
      default: "#ffffff",
      paper: "#a6a6a6ff",
    },
  },
  typography: {
    fontFamily: [
      "Arial",
      "Helvetica",
      "sans-serif",
    ].join(","),
  },
});

export default theme;