package io.h001.hconsole.grpc.dto;

import java.time.Instant;

import io.h001.hconsole.grpc.Log;

public record LogResponse(String type, Instant timestamp, String level, String message) {
    public static LogResponse fromGrpc(Log log) {
        return new LogResponse(
            "log",
            Instant.ofEpochMilli((long) (log.getTimestamp() * 1000)),
            log.getLevel(),
            log.getMessage()
        );
    }
}