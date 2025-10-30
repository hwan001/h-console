"use client";
import { useWebSocketStore } from "@/app/_stores/WebSocketStore";
import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";

export default function ConnectionIndicator() {
	const { isConnected, latency } = useWebSocketStore();
	const theme = useTheme();

	const getColor = () => {
		if (!isConnected) return "bg-red-500";
		if (latency === null) return "bg-yellow-500";
		if (latency < 100) return "bg-green-500";
		if (latency < 300) return "bg-yellow-400";
		return "bg-orange-500";
	};

	return (
		<Box display="flex" alignItems="center" gap={1}>
			<span
				className={`inline-block w-3 h-3 rounded-full ${getColor()} ${
					isConnected ? "animate-pulse" : ""
				}`}
			/>
			
			<Typography
				variant="body2"
				sx={{
					color: theme.palette.text.secondary,
					fontWeight: "bold",
				}}
			>
				{isConnected
					? latency !== null
						? `Connected (${latency} ms)`
						: "Connecting..."
					: "Disconnected"}
			</Typography>
		</Box>
	);
}
