import { createTheme, ThemeOptions } from "@mui/material/styles";

const pastelThemeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: { main: "#ffb6c1" },
		secondary: { main: "#b0e0e6" },
		background: { default: "#fff3f7ff", paper: "#fff1f1ff" },
	},
	shape: { borderRadius: 2 },
	typography: {
		fontFamily: ["Arial", "Helvetica", "sans-serif"].join(","),
	},
};

export const PastelTheme = createTheme(pastelThemeOptions);
