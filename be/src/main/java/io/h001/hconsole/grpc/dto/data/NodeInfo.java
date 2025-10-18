package io.h001.hconsole.grpc.dto.data;

public record NodeInfo(
        String id,
        String ip,
        String hostname,
        String role,
        double cpuUsage,
        double memoryUsage,
        String status,
        String uptime) {
}