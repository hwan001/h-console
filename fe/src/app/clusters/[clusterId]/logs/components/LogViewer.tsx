"use client";
import { useEffect, useRef, useState } from "react";
import { useWebSocketStore, WSMessage } from "@/app/_stores/WebSocketStore";

interface LogViewerProps {
	clusterId: string;
}

export default function LogViewer({ clusterId }: LogViewerProps) {
	const { connect, subscribe, unsubscribe } = useWebSocketStore();
	const [logs, setLogs] = useState<string[]>([]);
	const logEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		connect();

		const handler = (msg: WSMessage) => {
			if (typeof msg.payload === "string") {
				setLogs((prev) => [...prev, msg.payload]);
			}
		};

		const channel = `${clusterId}_logs`;
		subscribe(channel, handler);
		return () => unsubscribe(channel, handler);
	}, [clusterId]);

	// 자동 스크롤
	useEffect(() => {
		logEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [logs]);

	return (
		<div className="p-6 bg-black text-green-400 font-mono text-sm h-[600px] w-[700px] overflow-y-auto rounded-lg shadow-inner">
			{logs.map((line, i) => (
				<div key={i}>{line}</div>
			))}
			<div ref={logEndRef} />
		</div>
	);
}
