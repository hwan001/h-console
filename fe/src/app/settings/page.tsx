"use client";

import Layout from "@/app/_components/Layout";
import { ThemeName, useSettingStore } from "@app/_stores/SettingStore";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";

const SettingsPage = () => {
	const { themeName, setTheme } = useSettingStore();
	return (
		<Layout>
			<main className="p-3">
				<Box p={4}>
					<Typography variant="h5" mb={2}>
						App Settings
					</Typography>

					<Typography variant="subtitle1" gutterBottom>
						Select Theme
					</Typography>

					<ButtonGroup>
						{["light", "dark", "pastel"].map((t) => (
							<Button
								key={t}
								variant={themeName === t ? "contained" : "outlined"}
								onClick={() => setTheme(t as ThemeName)}
							>
								{t.toUpperCase()}
							</Button>
						))}
					</ButtonGroup>
				</Box>
			</main>
		</Layout>
	);
};

export default SettingsPage;
