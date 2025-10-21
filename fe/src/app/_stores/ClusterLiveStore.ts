import { create } from "zustand";
import {
	LiveWSMessage,
	MetricPayload,
	LogPayload,
	useWebSocketStore,
} from "./WebSocketStore";
import type { NodeInfo } from "./ClusterStore";

interface LiveClusterState {
	[clusterId: string]: NodeInfo[];
}

interface LogMap {
	[clusterId: string]: string[];
}

interface ClusterLiveStore {
	metric: LiveClusterState;
	log: LogMap;
	lastUpdate: Record<string, number>;
	agentStatus: Record<string, "online" | "offline">;
	subscribeCluster: (clusterId: string) => void;
	unsubscribeCluster: (clusterId: string) => void;
}

export const useClusterLiveStore = create<ClusterLiveStore>((set, get) => ({
	metric: {},
	log: {},
	lastUpdate: {},
	agentStatus: {},
	subscribeCluster: (clusterId) => {
		const ws = useWebSocketStore.getState();
		const channel = `username:${clusterId}`;

		ws.subscribe(channel, (rawPayload) => {
			const msg = rawPayload as LiveWSMessage;
			if (msg.payload.type === "metric") {
				const payload = msg.payload as MetricPayload;
				set((state) => ({
					metric: {
						...state.metric,
						[clusterId]: payload.nodes,
					},
					lastUpdate: { ...state.lastUpdate, [clusterId]: Date.now() },
				}));
			} else if (msg.payload.type === "log") {
				const payload = msg.payload as LogPayload;
				set((state) => ({
					log: {
						...state.log,
						[clusterId]: [
							...(state.log[clusterId] ?? []),
							`[${payload.timestamp}] [${payload.level}] ${payload.message}`,
						],
					},
					lastUpdate: { ...state.lastUpdate, [clusterId]: Date.now() },
				}));
			} else {
				console.log(`[LIVE] Ignored payload type: ${msg.payload}`);
			}
		});

		// 주기적으로 확인 (프론트에서 15초 이상 무응답이면 offline)
		const interval = setInterval(() => {
			const last = get().lastUpdate[clusterId];
			const now = Date.now();
			const diff = now - (last ?? 0);
			const isAlive = diff < 15000;
			set((state) => ({
				agentStatus: {
					...state.agentStatus,
					[clusterId]: isAlive ? "online" : "offline",
				},
			}));
		}, 5000);
	},

	unsubscribeCluster: (clusterId) => {
		const ws = useWebSocketStore.getState();
		const channel = `username:${clusterId}`;
		ws.unsubscribe(channel, () => {});
	},
}));
