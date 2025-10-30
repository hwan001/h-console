"use client";

import * as React from "react";
import Link from "next/link";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	Chip,
	Box,
	useTheme,
} from "@mui/material";
import { ClusterWithStatus } from "@/app/_stores/ClusterStore";

interface ClusterCardProps {
	cluster: ClusterWithStatus;
}

export default function ClusterCard({ cluster }: ClusterCardProps) {
	const theme = useTheme();

	const statusColor =
		cluster.clusterStatus === "running"
			? "success"
			: cluster.clusterStatus === "stopped"
			? "default"
			: "error";

	return (
		<Link href={`/clusters/${cluster.id}`}>
			<Card
				variant="outlined"
				sx={{
					bgcolor: theme.palette.background.paper,
					borderRadius: theme.shape.borderRadius,
					boxShadow: theme.shadows[1],
					"&:hover": {
						boxShadow: theme.shadows[4],
						transform: "translateY(-2px)",
					},
					transition: "all 0.2s ease",
				}}
			>
				<CardActionArea>
					<CardContent>
						{/* 헤더 */}
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							mb={1}
						>
							<Typography
								variant="subtitle1"
								fontWeight="bold"
								sx={{ color: theme.palette.text.primary, p: 1 }}
							>
								{cluster.name || "ClusterName"}
							</Typography>
							<Chip
								label={cluster.clusterStatus || "Running"}
								color={statusColor}
								size="small"
								sx={{
									fontWeight: 600,
									borderRadius: "8px",
								}}
							/>
						</Box>

						{/* 내용 */}
						<Box display="flex" flexDirection="column" gap={0.5}>
							<Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
								Control Plane: {cluster.controlPlane ?? 0}
							</Typography>
							<Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
								Data Plane: {cluster.dataPlane ?? 0}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
}