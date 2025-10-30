"use client";

import { Card, CardContent, Typography, Grid, useTheme } from "@mui/material";
import { ClusterWithStatus } from "@/app/_stores/ClusterStore";

export default function ClusterInfo({ cluster }: { cluster: ClusterWithStatus }) {
	const theme = useTheme();
	return (
		<Card
			sx={{
				bgcolor: theme.palette.background.paper,
				borderRadius: (theme.shape.borderRadius as number) * 2,
				boxShadow: theme.shadows[1],
				"&:hover": {
					boxShadow: theme.shadows[4],
					transform: "translateY(-2px)",
					transition: "all 0.2s ease",
				},
			}}
		>
			<CardContent>
				<Grid container spacing={2}>
					{/* Status */}
					<Grid>
						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							Status
						</Typography>
						<Typography
							variant="h6"
							sx={{
								color:
									cluster.clusterStatus === "running"
										? theme.palette.success.main
										: cluster.clusterStatus === "stopped"
										? theme.palette.grey[600]
										: theme.palette.error.main,
								fontWeight: 600,
							}}
						>
							{cluster.clusterStatus}
						</Typography>
					</Grid>

					{/* Control Plane */}
					<Grid>
						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							Control Plane
						</Typography>
						<Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
							{cluster.controlPlane}
						</Typography>
					</Grid>

					{/* Data Plane */}
					<Grid>
						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							Data Plane
						</Typography>
						<Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
							{cluster.dataPlane}
						</Typography>
					</Grid>

					{/* Created At */}
					<Grid>
						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							Created At
						</Typography>
						<Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
							{cluster.createdAt
								? new Date(cluster.createdAt).toLocaleString()
								: "Created recently"}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}