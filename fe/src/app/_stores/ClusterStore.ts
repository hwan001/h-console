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
  nodeCount?: number;
	createdAt: string;
	lastCheckedAt?: string;
	errorMessage?: string;
	latencyMs?: number;
	endpoint?: string;
}

type ClusterStatus = "running" | "stopped";
type ConnectionStatus = "idle" | "checking" | "success" | "failed";

export interface ClusterWithStatus extends ClusterConfig {
	connectionStatus: ConnectionStatus;
	clusterStatus: ClusterStatus;
	lastCheckedAt?: Date;
	errorMessage?: string;
	latencyMs?: number;
}

interface ClusterStore {
	clusters: ClusterWithStatus[];
	fetchClusters: () => Promise<void>;
}

export const useClusterStore = create<ClusterStore>((set) => ({
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
				nodeCount: c.nodeCount ?? 0,
				createdAt: c.createdAt ?? undefined,
				clusterStatus: c.status === "running" ? "running" : "stopped",
				connectionStatus: "idle",
				lastCheckedAt: c.lastCheckedAt
					? new Date(c.lastCheckedAt)
					: undefined,
				errorMessage: c.errorMessage ?? undefined,
				latencyMs: c.latencyMs ?? undefined,
			}));

			set({ clusters: formatted });
		} catch (err) {
			console.error("useClusterStore.fetchClusters error:", err);
		}
	},
}));
