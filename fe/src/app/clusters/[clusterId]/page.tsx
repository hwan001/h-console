"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { CircularProgress, Typography, Box } from "@mui/material";
import Layout from "@/app/_components/Layout";
import { useClusterStore } from "@/app/_stores/ClusterStore";
import { useClusterLiveStore } from "@/app/_stores/ClusterLiveStore";
import ClusterInfo from "./components/ClusterInfo";
import NodeTable from "./components/NodeTable";
import LogViewer from "./components/LogViewer";

export default function ClusterDetailPage() {
  const { clusterId } = useParams<{ clusterId: string }>();
  const { clusters, fetchClusters } = useClusterStore();
  const { metric, subscribeCluster, unsubscribeCluster } = useClusterLiveStore();

  const liveNodes = metric[clusterId] || [];

  useEffect(() => {
    if (clusters.length === 0) {
      fetchClusters();
    }
  }, [clusters.length, fetchClusters]);

  useEffect(() => {
    if (!clusterId) return;
    subscribeCluster(clusterId);
    return () => unsubscribeCluster(clusterId);
  }, [clusterId]);

  const cluster = clusters.find((c) => c.id === clusterId);

  if (!cluster) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
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
          <NodeTable nodes={liveNodes.length ? liveNodes : cluster.nodes} />
        </Box>

        <Box mt={6}>
          <Typography variant="h6" mb={2}>
            Log Viewer
          </Typography>
          <LogViewer clusterId={clusterId} />
        </Box>
      </Box>
    </Layout>
  );
}