"use client";
import { useEffect } from "react";
import { useWebSocketStore, WSMessage } from "@/app/_store/WebSocketStore";

export default function ChatComponent() {
	const { connect, subscribe, unsubscribe } = useWebSocketStore();

	useEffect(() => {
		connect();

		const handler = (msg: WSMessage) => {
			console.log("Chat message:", msg.payload);
		};

		subscribe("chat", handler);
		return () => unsubscribe("chat", handler);
	}, []);

	return <div>Chat Connected</div>;
}
