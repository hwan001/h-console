import { Box, Typography, useTheme } from "@mui/material";

export default function CodeBlock({ code }: { code: string }) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				bgcolor: "#1e1e1e", // theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
				color: "#00b809ff", // theme.palette.mode === "dark" ? "#e0e0e0" : "#333",
				fontFamily: "monospace",
				fontSize: "0.9rem",
				borderRadius: 2,
				p: 2,
				overflowX: "auto",
				border: `1px solid ${
					"#333" // theme.palette.mode === "dark" ? "#333" : "#ddd"
				}`,
				marginBottom: 2,
			}}
		>
			<Typography component="pre" sx={{ m: 0, whiteSpace: "pre-wrap" }}>
				{code}
			</Typography>
		</Box>
	);
}
