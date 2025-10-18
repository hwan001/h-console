package io.h001.hconsole.grpc.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.grpc.stub.StreamObserver;
import io.h001.hconsole.grpc.Metric;
import io.h001.hconsole.grpc.MetricsStreamServiceGrpc;
import io.h001.hconsole.grpc.Response;
import io.h001.hconsole.grpc.dto.MetricResponse;
import io.h001.hconsole.redis.services.RedisPublisherService;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@Slf4j
@GrpcService
@RequiredArgsConstructor
public class MetricsStreamServiceImpl extends MetricsStreamServiceGrpc.MetricsStreamServiceImplBase {
    private final ObjectMapper objectMapper;
    private final RedisPublisherService redisPublisherService;

    @Override
    public StreamObserver<Metric> sendMetrics(StreamObserver<Response> responseObserver) {

        return new StreamObserver<>() {
            @Override
            public void onNext(Metric metric) {
                try {
                    String channel = String.format("%s:%s", "username", "7");

                    MetricResponse dto = MetricResponse.fromGrpc(metric);
                    String json = objectMapper.writeValueAsString(dto);

                    redisPublisherService.publish(channel, json);
                    log.info("[STREAM][{}] Published metric: {}", channel, json);

                    // System.out.printf("[STREAM][%s] cpu=%.2f, mem=%.2f, nodes=%d %s%n",
                    // // "%s:%s".formatted("username", "7"),
                    // channel,
                    // metric.getCpu(), metric.getMem(), metric.getNodesCount(),
                    // metric.getNodesList().stream()
                    // .map(n -> "[%s:%s]".formatted(n.getName(), n.getIp()))
                    // .toList());

                } catch (Exception e) {
                    log.error("[STREAM] Error processing metric", e);
                }
            }

            @Override
            public void onError(Throwable t) {
                System.err.println("[STREAM] Error: " + t.getMessage());
            }

            @Override
            public void onCompleted() {
                Response response = Response.newBuilder().setSuccess(true).build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
                System.out.println("[STREAM] Completed.");
            }
        };
    }
}