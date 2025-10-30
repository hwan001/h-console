"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
	LinearProgress,
	Box,
	Typography,
} from "@mui/material";
import { NodeInfo } from "@/app/_stores/ClusterStore";
import { useTheme } from "@mui/material/styles";

export default function NodeTable({ nodes }: { nodes?: NodeInfo[] }) {
	const theme = useTheme();

	if (!nodes) {
		return (
			<Box
				component={Paper}
				sx={{
					borderRadius: (theme.shape.borderRadius as number) * 2,
					boxShadow: theme.shadows[1],
					p: 6,
					textAlign: "center",
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.text.primary,
				}}
			>
				<Typography variant="h6" color="text.secondary">
					No nodes available
				</Typography>
				<Typography variant="body2" color="text.disabled">
					클러스터에 등록된 노드가 없습니다.
				</Typography>
			</Box>
		);
	}

	return (
		<TableContainer
			component={Paper}
			sx={{
				borderRadius: (theme.shape.borderRadius as number) * 2,
				boxShadow: theme.shadows[1],
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.primary,
			}}
		>
			<Table>
				<TableHead>
					<TableRow
						sx={{
							backgroundColor: theme.palette.action.hover,
						}}
					>
						<TableCell>IP</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Hostname</TableCell>
						<TableCell>CPU</TableCell>
						<TableCell>Memory</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Uptime</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{nodes.map((node) => (
						<TableRow
							key={node.id ?? node.ip ?? node.hostname}
							sx={{
								"&:hover": {
									backgroundColor: theme.palette.action.selected,
								},
							}}
						>
							<TableCell>{node.ip}</TableCell>
							<TableCell>
								<Chip
									label={node.role === "control" ? "Control" : "Data"}
									color={node.role === "control" ? "primary" : "secondary"}
									size="small"
								/>
							</TableCell>
							<TableCell>{node.hostname}</TableCell>

							<TableCell>
								<Box>
									<LinearProgress
										variant="determinate"
										value={node.cpuUsage}
										sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
									/>
									<Typography variant="caption">{node.cpuUsage}%</Typography>
								</Box>
							</TableCell>

							<TableCell>
								<Box>
									<LinearProgress
										variant="determinate"
										value={node.memoryUsage}
										color="secondary"
										sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
									/>
									<Typography variant="caption">{node.memoryUsage}%</Typography>
								</Box>
							</TableCell>

							<TableCell>
								<Chip
									label={node.status}
									color={
										node.status === "healthy"
											? "success"
											: node.status === "warning"
											? "warning"
											: "error"
									}
									size="small"
								/>
							</TableCell>

							<TableCell>{node.uptime}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
