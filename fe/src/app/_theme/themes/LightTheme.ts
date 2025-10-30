import { createTheme, ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: { main: "#1976d2" },
		background: { default: "#fff", paper: "#fff" },
	},
	shape: { borderRadius: 2 },
	typography: {
		fontFamily: ["Arial", "Helvetica", "sans-serif"].join(","),
	},
};
export const LightTheme = createTheme(lightThemeOptions);
