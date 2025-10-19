"use client";
import { create } from "zustand";
import { NodeInfo } from "./ClusterStore";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface WSMessage<T = any> {
  channel: string;
  payload: T;
}

export type MessageType = "metric" | "log" | "event" | "policy" | "system";

export interface MetricPayload {
  type: "metric";
  timestamp: string;
  nodes: NodeInfo[];
  cpuUsage: number;
  memoryUsage: number;
}

export interface LogPayload {
  type: "log";
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export interface LogPayload {
  type: "log";
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export type Payload = MetricPayload | LogPayload;

export type ClusterWSMessage = WSMessage<Payload>;


interface WebSocketState {
	socket: WebSocket | null;
	channels: Record<string, ((msg: WSMessage) => void)[]>;
	isConnected: boolean;
	latency: number | null;
	connect: () => void;
	disconnect: () => void;
	send: (msg: WSMessage) => void;
	subscribe: (channel: string, handler: (msg: WSMessage) => void) => void;
	unsubscribe: (channel: string, handler: (msg: WSMessage) => void) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
	socket: null,
	channels: {},
	isConnected: false,
	latency: null,

	connect: () => {
		if (get().socket) return;

		const ws = new WebSocket(`ws://${API_BASE}/ws`);
		let pingTimer: NodeJS.Timeout | null = null;
		let lastPingTime: number | null = null;

		ws.onopen = () => {
			set({ isConnected: true });

			pingTimer = setInterval(() => {
				lastPingTime = Date.now();
				get().send({ channel: "system", payload: "ping" });
			}, 5000);
		};

		ws.onmessage = (event) => {
			const msg: WSMessage = JSON.parse(event.data);

			if (msg.channel === "system" && msg.payload === "pong" && lastPingTime) {
				const latency = Date.now() - lastPingTime;
				set({ latency });
				return;
			}

			const handlers = get().channels[msg.channel] || [];
			handlers.forEach((h) => h(msg));
		};

		ws.onclose = () => {
			set({ socket: null, isConnected: false, latency: null });
			setTimeout(() => get().connect(), 2000);
		};

		set({ socket: ws });
	},

	disconnect: () => {
		get().socket?.close();
		set({ socket: null, isConnected: false, latency: null });
	},

	send: (msg: WSMessage) => {
		const socket = get().socket;
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.warn("WebSocket not open. Message skipped:", msg);
			return;
		}

		socket.send(JSON.stringify(msg));
	},

	subscribe: (channel, handler) => {
		set((state) => {
			const handlers = state.channels[channel] || [];
			return {
				channels: { ...state.channels, [channel]: [...handlers, handler] },
			};
		});

		get().send({
			channel: "control",
			payload: { action: "subscribe", channel },
		});
	},

	unsubscribe: (channel, handler) => {
		set((state) => {
			const handlers = state.channels[channel] || [];
			return {
				channels: {
					...state.channels,
					[channel]: handlers.filter((h) => h !== handler),
				},
			};
		});

		get().send({
			channel: "control",
			payload: { action: "unsubscribe", channel },
		});
	},
}));
