package io.h001.hconsole.grpc;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class MetricsStreamServiceImpl extends MetricsStreamServiceGrpc.MetricsStreamServiceImplBase {

    @Override
    public StreamObserver<Metric> sendMetrics(StreamObserver<Response> responseObserver) {

        return new StreamObserver<>() {
            @Override
            public void onNext(Metric metric) {
                System.out.printf("[STREAM] node=%s, cpu=%.2f, mem=%.2f%n",
                        metric.getNode(), metric.getCpu(), metric.getMem());
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