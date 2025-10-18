"use client";
import { Box, Grid, Typography } from "@mui/material";
import ClusterCard from "./ClusterCard";

export default function ClusterGrid({ clusters }: { clusters: any[] }) {
	if (!clusters) {
		return (
			<Box className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
				<Typography variant="h6" color="text.secondary">
					No clusters found
				</Typography>
				<Typography variant="body2" color="text.disabled">
					연결된 클러스터가 없습니다.
				</Typography>
			</Box>
		);
	}

	return (
		<Grid container spacing={3}>
			{clusters.map((cluster) => (
				<Grid key={cluster.id}>
					<ClusterCard cluster={cluster} />
				</Grid>
			))}
		</Grid>
	);
}
