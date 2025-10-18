"use client";

import { Card, CardContent, Typography, Grid } from "@mui/material";
import { ClusterWithStatus } from "@/app/_stores/ClusterStore";

export default function ClusterInfo({
	cluster,
}: {
	cluster: ClusterWithStatus;
}) {
	return (
		<Card className="bg-gray-100 rounded-2xl shadow-sm">
			<CardContent>
				<Grid container spacing={2}>
					<Grid>
						<Typography variant="body2" color="text.secondary">
							Status
						</Typography>
						<Typography variant="h6">{cluster.clusterStatus}</Typography>
					</Grid>

					<Grid>
						<Typography variant="body2" color="text.secondary">
							Control Plane
						</Typography>
						<Typography variant="h6">{cluster.controlPlane}</Typography>
					</Grid>

					<Grid>
						<Typography variant="body2" color="text.secondary">
							Data Plane
						</Typography>
						<Typography variant="h6">{cluster.dataPlane}</Typography>
					</Grid>

					<Grid>
						<Typography variant="body2" color="text.secondary">
							Created At
						</Typography>
						<Typography variant="h6">
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
