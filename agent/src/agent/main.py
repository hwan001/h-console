from datetime import datetime
import queue
from NodeCache import NodeCache
from kubernetes import client, config
from agent.sender import gRPCClient, data_generator
from collector import ClusterCollector

q = queue.Queue()

def get_cluster_info():
    nodes = NodeCache().get_nodes()
    return {
        "id": "cluster-001",
        "hostname": "h-console-cluster",
        "status": "running" if any(n["status"] == "healthy" for n in nodes) else "stopped",
        "nodes": nodes,
        "createdAt": datetime.now().isoformat(),
        "endpoint": nodes[0]["ip"] if nodes else None,
        "nodeCount": len(nodes),
    }

if __name__ == "__main__":
    collector = ClusterCollector(q)
    collector.start()

    try:
        metrics_client = gRPCClient(host="localhost", port=50051)
        metrics_client.send_stream(data_generator(q))
    except KeyboardInterrupt:
        print("Stopping collectors...")
        collector.stop()

