import grpc
import time
import traceback
import queue
from agent import metrics_pb2, metrics_pb2_grpc


class MetricsClient:
    def __init__(self, host="localhost", port=50051):
        self.host = host
        self.port = port
        self.channel = grpc.insecure_channel(f"{host}:{port}")
        self.stub = metrics_pb2_grpc.MetricsStreamServiceStub(self.channel)

    def send_stream(self, metric_iterator):
        while True:
            try:
                print(f"[gRPC] Connecting to {self.host}:{self.port} ...")
                response = self.stub.SendMetrics(metric_iterator)
                print("[gRPC] Server response:", response.success)
                break  # 정상 종료 시 빠져나옴
            except grpc.RpcError as e:
                print(f"[gRPC] Error: {e.code()} - {e.details()}")
                print("[gRPC] Retrying in 3 seconds...")
                time.sleep(3)
            except Exception as e:
                print(f"[gRPC] Unexpected error: {e}")
                traceback.print_exc()
                time.sleep(3)


def metric_generator(metrics_queue):
    while True:
        try:
            metric = metrics_queue.get(timeout=2)
            if metric is None:
                print("[GEN] Stop signal received.")
                break

            print(f"[GEN] Sending metric: {metric}")
            nodes = [
                metrics_pb2.NodeInfo(
                    id=n.get("id", ""),
                    ip=n.get("ip", "N/A"),
                    hostname=n.get("hostname", ""),
                    role=n.get("role", "data"),
                    cpuUsage=float(n.get("cpuUsage", 0.0)),
                    memoryUsage=float(n.get("memoryUsage", 0.0)),
                    status=n.get("status", "unknown"),
                    uptime=n.get("uptime", "0d 0h 0m")
                )
                for n in metric.get("nodes", [])
            ]

            yield metrics_pb2.Metric(
                nodes=nodes,
                # cpu=float(metric.get("cpu", 0.0)),
                # mem=float(metric.get("mem", 0.0)),
                timestamp=float(metric.get("timestamp", time.time())),
            )
        except queue.Empty:
            continue
        except grpc.RpcError:
            print("[GEN] Stream closed by server.")
            break
        except Exception as e:
            print(f"[GEN] Exception in generator: {e}")
            traceback.print_exc()
            time.sleep(1)
