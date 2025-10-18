"use client";
import { useEffect } from "react";

import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import { useClusterStore } from "@/app/_stores/ClusterStore";
import ClusterGrid from "./components/ClusterGrid";
import Layout from "@/app/_components/Layout";

const ClustersPage = () => {
	const { isLoading, clusters, fetchClusters } = useClusterStore();

	useEffect(() => {
		fetchClusters();
	}, [fetchClusters]);

	return (
		<Layout>
			<main className="p-3">
				{/* 헤더 타이틀 */}
				<Box display="flex" alignItems="center" mb={4}>
					<Typography
						variant="h5"
						component="h1"
						fontWeight="bold"
						className="text-gray-800"
					>
						Clusters
					</Typography>
					<Typography
						variant="h6"
						component="span"
						className="ml-2 text-gray-500"
					>
						({clusters.length})
					</Typography>
				</Box>

				{/* Cluster Grid */}
				{isLoading < 0 ? (
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						sx={{ py: 4 }}
					>
						<CircularProgress />
						<Typography sx={{ ml: 2 }}>Loading clusters...</Typography>
					</Grid>
				) : (
					<ClusterGrid clusters={clusters} />
				)}
			</main>
		</Layout>
	);
};

export default ClustersPage;
