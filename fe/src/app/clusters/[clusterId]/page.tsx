"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { CircularProgress, Typography, Box } from "@mui/material";
import Layout from "@/app/_components/Layout";
import { useClusterStore } from "@/app/_stores/ClusterStore";
import ClusterInfo from "./components/ClusterInfo";
import NodeTable from "./components/NodeTable";
import LogViewer from "./components/LogViewer";

export default function ClusterDetailPage() {
	const { clusterId } = useParams();
	const { clusters, fetchClusters } = useClusterStore();

	useEffect(() => {
		if (clusters.length === 0) {
			fetchClusters();
		}
	}, [clusters.length, fetchClusters]);
	console.log(clusterId, clusters);
	const cluster = clusters.find((c) => c.id === clusterId);

	if (!cluster) {
		return (
			<Layout>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="60vh"
				>
					<CircularProgress />
					<Typography sx={{ ml: 2 }}>Loading cluster details...</Typography>
				</Box>
			</Layout>
		);
	}

	return (
		<Layout>
			<Box className="p-6 w-full max-w-none">
				<Typography variant="h4" fontWeight="bold" mb={4}>
					{cluster.name}
				</Typography>

				<ClusterInfo cluster={cluster} />

				<Box mt={6}>
					<Typography variant="h6" mb={2}>
						Node Status
					</Typography>
					<NodeTable nodes={cluster.nodes} />
				</Box>

				<Box mt={6}>
					<Typography variant="h6" mb={2}>
						Log Viewer
					</Typography>
					<LogViewer clusterId={clusterId ? clusterId.toString() : ""} />
				</Box>
			</Box>
		</Layout>
	);
}
