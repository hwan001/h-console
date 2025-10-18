import cluster from "cluster";
import { create } from "zustand";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface ClusterConfig {
	id: string;
	name: string;
	endpoint: string;
	nodeCount?: number;
	createdAt?: string; // ISO
}

interface ClustersDTO {
	id: number | string;
	name: string;
	status: ClusterStatus | string;
	nodes?: NodeInfo[];
	createdAt: string;
	lastCheckedAt?: string;
	errorMessage?: string;
	latencyMs?: number;
	endpoint?: string;
}

export interface NodeInfo {
	id: string;
	ip: string;
	hostname: string;
	role: "control" | "data"; // 노드 역할
	cpuUsage: number; // CPU 사용률 (0~100)
	memoryUsage: number; // Memory 사용률 (0~100)
	status: "healthy" | "warning" | "down"; // 상태 표시
	uptime: string; // e.g. "5d 3h 12m"
	diskUsage?: number; // 선택적으로 추가 가능
	networkLatency?: number; // ms 단위 (선택)
}

type ClusterStatus = "running" | "stopped";
type ConnectionStatus = "idle" | "checking" | "success" | "failed";

export interface ClusterWithStatus extends ClusterConfig {
	connectionStatus: ConnectionStatus;
	clusterStatus: ClusterStatus;
	lastCheckedAt?: Date;
	errorMessage?: string;
	latencyMs?: number;
	controlPlane: number;
	dataPlane: number;
	nodes?: NodeInfo[];
}

interface ClusterStore {
	isLoading: number;
	clusters: ClusterWithStatus[];
	fetchClusters: () => Promise<void>;
}

export const useClusterStore = create<ClusterStore>((set) => ({
	isLoading: -1,
	clusters: [],
	fetchClusters: async () => {
		try {
			const url = API_BASE
				? `http://${API_BASE}/clusters/all`
				: `/api/clusters/all`;

			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Failed to fetch clusters: ${res.status}`);
			}

			const json = await res.json();
			const rawClusters: ClustersDTO[] = json?.data?.clusters ?? [];
			const formatted: ClusterWithStatus[] = rawClusters.map((c) => ({
				id: String(c.id),
				name: c.name,
				endpoint: c.endpoint ?? "",
				nodeCount: c.nodes?.length ?? 0,
				createdAt: c.createdAt ?? undefined,
				clusterStatus: c.status === "running" ? "running" : "stopped",
				connectionStatus: "idle",
				lastCheckedAt: c.lastCheckedAt ? new Date(c.lastCheckedAt) : undefined,
				errorMessage: c.errorMessage ?? undefined,
				latencyMs: c.latencyMs ?? undefined,
				controlPlane: c.nodes?.filter(n => n.role === "control").length ?? 0,
				dataPlane: c.nodes?.filter(n => n.role === "data").length ?? 0,
				nodes: c.nodes,
			}));

			set({ clusters: formatted });
			set({ isLoading: rawClusters.length });
		} catch (err) {
			console.error("useClusterStore.fetchClusters error:", err);
		}
	},
}));
