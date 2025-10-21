import { ClusterWithStatus } from "@/app/_stores/ClusterStore";

export const mockClusters: ClusterWithStatus[] = [
	{
		id: "cluster-1",
		name: "Alpha Cluster",
		clusterStatus: "running",
		controlPlane: 3,
		dataPlane: 5,
		connectionStatus: "success",
		endpoint: "https://alpha.cluster.local",
		createdAt: "2025-10-17T08:00:00Z",
		nodes: [
			{
				id: "node-1",
				ip: "10.0.0.11",
				hostname: "alpha-control-1",
				role: "control",
				cpuUsage: 42,
				memoryUsage: 67,
				status: "healthy",
				uptime: "12d 4h",
			},
			{
				id: "node-2",
				ip: "10.0.0.12",
				hostname: "alpha-data-1",
				role: "data",
				cpuUsage: 75,
				memoryUsage: 81,
				status: "warning",
				uptime: "7d 2h",
			},
			{
				id: "node-3",
				ip: "10.0.0.13",
				hostname: "alpha-data-2",
				role: "data",
				cpuUsage: 23,
				memoryUsage: 54,
				status: "healthy",
				uptime: "4d 21h",
			},
		],
	},
];
