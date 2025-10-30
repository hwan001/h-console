"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LightTheme } from "./themes/LightTheme";
import { DarkTheme } from "./themes/DarkTheme";
import { PastelTheme } from "./themes/PastelTheme";
import { useSettingStore } from "@app/_stores/SettingStore";

const muiCache = createCache({ key: "mui", prepend: true });

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const themeName = useSettingStore((state) => state.themeName);
	const themes = {
		light: LightTheme,
		dark: DarkTheme,
		pastel: PastelTheme,
	};

	return (
		<CacheProvider value={muiCache}>
			<ThemeProvider theme={themes[themeName]}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
}
