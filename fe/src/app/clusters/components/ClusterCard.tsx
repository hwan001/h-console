"use client";

import * as React from "react";
import Link from "next/link";
import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Typography,
	Chip,
	Box,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ClusterWithStatus } from "@/app/_stores/ClusterStore";

interface ClusterCardProps {
	cluster: ClusterWithStatus;
}

export default function ClusterCard({ cluster }: ClusterCardProps) {
	const statusColor =
		cluster.clusterStatus === "running"
			? "success"
			: cluster.clusterStatus === "stopped"
			? "default"
			: "error";

	return (
		<Card
			variant="outlined"
			sx={{
				transition: "all 0.2s ease-in-out",
				"&:hover": {
					boxShadow: 4,
					transform: "translateY(-2px)",
				},
			}}
		>
			<Link href={`/clusters/${cluster.id}`} passHref>
				<CardActionArea>
					<CardHeader
						title={
							<Typography variant="h6" component="div">
								{cluster.name}
							</Typography>
						}
						action={
							<Chip
								label={cluster.clusterStatus}
								color={statusColor}
								size="small"
							/>
						}
					/>
					<CardContent>
						<Box display="flex" flexDirection="column" gap={0.5}>
							<Typography variant="body2" color="text.secondary">
								Nodes: {cluster.nodeCount}
							</Typography>

							<Typography variant="caption" color="text.disabled">
								{cluster.createdAt
									? `Created ${formatDistanceToNow(
											new Date(cluster.createdAt)
									  )} ago`
									: "Created recently"}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
}
