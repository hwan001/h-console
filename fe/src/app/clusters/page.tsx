"use client";
import { useEffect, useState } from "react";

import {
	Grid,
	CircularProgress,
	Typography,
	Box,
	Button,
	Modal,
} from "@mui/material";
import { useClusterStore } from "@/app/_stores/ClusterStore";
import ClusterGrid from "./components/ClusterGrid";
import Layout from "@/app/_components/Layout";
import CodeBlock from "@/app/_components/CodeBlock";

const ClustersPage = () => {
	const { isLoading, clusters, fetchClusters } = useClusterStore();
	const [open, setOpen] = useState(false);

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
					<Button
						variant="contained"
						className="bg-blue-500 hover:bg-blue-600"
						sx={{ ml: "auto" }}
						onClick={() => setOpen(true)}
					>
						{"Add Cluster"}
					</Button>
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

				{/* 모달 */}
				<Modal open={open} onClose={() => setOpen(false)}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							bgcolor: "background.paper",
							boxShadow: 24,
							p: 4,
							borderRadius: 2,
							width: 400,
						}}
					>
						<Typography variant="h6" mb={2}>
							새 클러스터 추가
						</Typography>
						
						<CodeBlock code="helm install my-cluster stable/my-cluster-chart"/>

						<Button variant="contained" onClick={() => setOpen(false)}>
							닫기
						</Button>
					</Box>
				</Modal>
			</main>
		</Layout>
	);
};

export default ClustersPage;
