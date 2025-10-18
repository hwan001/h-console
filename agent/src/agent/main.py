from datetime import datetime
import json
import time
import psutil
import queue
import threading
from NodeCache import NodeCache
from kubernetes import client, config
from agent.sender import MetricsClient, metric_generator

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

def collect_metrics():
    cpu = psutil.cpu_percent()
    mem_info = psutil.virtual_memory()
    node_cache = NodeCache()
    nodes = node_cache.get_nodes()

    return {
        "type": "metric",
        "timestamp": time.time(),
        # "cpu": cpu,
        # "mem": mem_info.percent,
        "nodes": nodes,
    }

def producer():
    while True:
        data = collect_metrics()
        print(f"[PRODUCER] Collected: {data}")
        q.put(data)
        time.sleep(3)


if __name__ == "__main__":
    threading.Thread(target=producer, daemon=True).start()

    metricsClient = MetricsClient(host="localhost", port=50051)
    metricsClient.send_stream(metric_generator(q))
