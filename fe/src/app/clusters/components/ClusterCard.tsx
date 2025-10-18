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
} from "@mui/material";
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
    <Link href={`/clusters/${cluster.id}`}>
      <Card
        variant="outlined"
        className="bg-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
        sx={{
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardActionArea>
          <CardContent>
            {/* 카드 헤더 */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                className="text-gray-800 p-3"
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

            {/* 카드 내용 */}
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Typography variant="body2" className="text-gray-700">
                Control Plane: {cluster.controlPlane ?? 0}
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                Data Plane: {cluster.dataPlane ?? 0}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}