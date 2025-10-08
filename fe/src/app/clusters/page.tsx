"use client"
import { useEffect } from "react";
import Header from "../_components/Header";
import TestButton from "../_components/TestButton";
import ClusterCard from "./components/ClusterCard";

import { Grid, CircularProgress, Typography } from "@mui/material";
import { useClusterStore } from "@/app/_stores/ClusterStore"; // store import 경로 확인 필요!

const ClustersPage = () => {
	const { clusters, fetchClusters } = useClusterStore();

	useEffect(() => {
		fetchClusters();
	}, [fetchClusters]);

	const isLoading = clusters.length === 0;
	return (
		<main>
			<Header />
			<h1>Clusters Page</h1>
			{isLoading ? (
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
				<Grid container spacing={2}>
					{clusters.map((cluster) => (
						<Grid key={cluster.id}>
							<ClusterCard cluster={cluster} />
						</Grid>
					))}
				</Grid>
			)}
			<TestButton endpoint="/" content="돌아가기" />
		</main>
	);
};

export default ClustersPage;
