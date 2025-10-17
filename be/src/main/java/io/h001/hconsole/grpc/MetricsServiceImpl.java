package io.h001.hconsole.grpc;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class MetricsServiceImpl extends MetricsServiceGrpc.MetricsServiceImplBase {

    @Override
    public void sendMetrics(Metric request, StreamObserver<Response> responseObserver) {
        System.out.printf("[SERVER] Received metric: node=%s, cpu=%.2f, mem=%.2f%n",
                request.getNode(), request.getCpu(), request.getMem());

        Response response = Response.newBuilder().setSuccess(true).build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}