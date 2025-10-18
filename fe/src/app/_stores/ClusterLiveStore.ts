import { create } from "zustand";
import {
	ClusterWSMessage,
	MetricPayload,
	useWebSocketStore,
} from "./WebSocketStore";
import type { NodeInfo } from "./ClusterStore";

interface LiveClusterState {
	[clusterId: string]: NodeInfo[];
}

interface ClusterLiveStore {
	metric: LiveClusterState;
	lastUpdate: Record<string, number>;
    agentStatus: Record<string, "online" | "offline">;
	subscribeCluster: (clusterId: string) => void;
	unsubscribeCluster: (clusterId: string) => void;
}

export const useClusterLiveStore = create<ClusterLiveStore>((set, get) => ({
	metric: {},
	lastUpdate: {},
    agentStatus: {},
	subscribeCluster: (clusterId) => {
		const ws = useWebSocketStore.getState();
		const channel = `username:${clusterId}`;

		ws.subscribe(channel, (rawPayload) => {
			const msg = rawPayload as ClusterWSMessage;
			if (msg.payload.type === "metric") {
				const payload = msg.payload as MetricPayload;
				set((state) => ({
					metric: {
						...state.metric,
						[clusterId]: payload.nodes,
					},
                    lastUpdate: { ...state.lastUpdate, [clusterId]: Date.now() },
				}));
			} else {
				console.log(`[LIVE] Ignored payload type: ${msg.payload.type}`);
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
