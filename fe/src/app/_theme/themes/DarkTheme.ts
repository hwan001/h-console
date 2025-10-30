import { createTheme, ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: { main: "#90caf9" },
		secondary: { main: "#ce93d8" },
		background: {
			default: "#121212",
			paper: "#2b2a2aff",
		},
	},
	shape: {
		borderRadius: 2,
	},
	typography: {
		fontFamily: ["Arial", "Helvetica", "sans-serif"].join(","),
		h6: {
			fontWeight: 700,
		},
	},
};

export const DarkTheme = createTheme(darkThemeOptions);
