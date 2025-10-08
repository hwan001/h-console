"use client";
import { useWebSocketStore } from "@/app/_stores/WebSocketStore";

export default function ConnectionIndicator() {
	const { isConnected, latency } = useWebSocketStore();

	const getColor = () => {
		if (!isConnected) return "bg-red-500";
		if (latency === null) return "bg-yellow-500";
		if (latency < 100) return "bg-green-500";
		if (latency < 300) return "bg-yellow-400";
		return "bg-orange-500";
	};

	return (
		<div className="flex items-center gap-2">
			<span
				className={`inline-block w-3 h-3 rounded-full ${getColor()} ${
					isConnected ? "animate-pulse" : ""
				}`}
			/>
			<span className="text-sm text-gray-300">
				{isConnected
					? latency !== null
						? `Connected (${latency} ms)`
						: "Connecting.."
					: "Disconnected"}
			</span>
		</div>
	);
}
