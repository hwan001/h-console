import grpc
import time
import traceback
import queue
from agent import stream_pb2, stream_pb2_grpc

class gRPCClient:
    def __init__(self, host="localhost", port=50051):
        self.host = host
        self.port = port
        self.channel = grpc.insecure_channel(f"{host}:{port}")
        self.stub = stream_pb2_grpc.StreamServiceStub(self.channel)

    def send_stream(self, data_iterator):
        while True:
            try:
                print(f"[gRPC] Connected to {self.host}:{self.port}")
                response = self.stub.SendStream(data_iterator)
                print("[gRPC] Response:", response.success)
                break
            except grpc.RpcError as e:
                print(f"[gRPC] Error: {e.code()} - {e.details()}")
                time.sleep(3)

def data_generator(data_queue):
    while True:
        try:
            item = data_queue.get(timeout=2)
            item_type = item.get("type")
            timestamp = float(item.get("timestamp", time.time()))

            if item_type == "metric":
                nodes = [
                    stream_pb2.NodeInfo(
                        id=n.get("id", ""),
                        ip=n.get("ip", "N/A"),
                        hostname=n.get("hostname", ""),
                        role=n.get("role", "data"),
                        cpuUsage=float(n.get("cpuUsage", 0.0)),
                        memoryUsage=float(n.get("memoryUsage", 0.0)),
                        status=n.get("status", "unknown"),
                        uptime=n.get("uptime", "0d 0h 0m")
                    )
                    for n in item.get("nodes", [])
                ]
                
                yield stream_pb2.StreamPayload(
                    metric=stream_pb2.Metric(
                        timestamp=timestamp,
                        nodes=nodes,
                    )
                )
                print(f"[GEN][METRIC] Sent metric ({len(nodes)} nodes)")
            elif item_type == "log":
                yield stream_pb2.StreamPayload(
                    log=stream_pb2.Log(
                        timestamp=timestamp,
                        level=item.get("level", "INFO"),
                        message=item.get("message", ""),
                    )
                )
                print(
                    f"[GEN][LOG] {item.get('level', 'INFO')}: {item.get('message', '')}")
            else:
                print(f"[GEN] Unknown item type: {item_type}")

        except queue.Empty:
            continue
        except grpc.RpcError:
            print("[GEN] Stream closed by server.")
            break
        except Exception as e:
            print(f"[GEN] Exception in generator: {e}")
            traceback.print_exc()
            time.sleep(1)
