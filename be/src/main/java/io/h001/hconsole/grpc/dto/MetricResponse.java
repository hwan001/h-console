package io.h001.hconsole.grpc.dto;

import java.time.Instant;
import java.util.List;
import io.h001.hconsole.grpc.Metric;
import io.h001.hconsole.grpc.dto.data.NodeInfo;

public record MetricResponse(String type, List<NodeInfo> nodes, Instant timestamp) {

    public static MetricResponse fromGrpc(Metric metric) {
        List<NodeInfo> nodes = metric.getNodesList().stream()
                .map(n -> new NodeInfo(
                        n.getId(),
                        n.getIp(),
                        n.getHostname(),
                        n.getRole(),
                        n.getCpuUsage(),
                        n.getMemoryUsage(),
                        n.getStatus(),
                        n.getUptime()))
                .toList();

        return new MetricResponse(
                "metric",
                nodes,
                // metric.getCpu(),
                // metric.getMem(),
                Instant.ofEpochMilli((long) (metric.getTimestamp() * 1000)));
    }

}
