from kubernetes import client, config
import psutil
import time
import socket
import datetime


class NodeCache:
    def __init__(self, ttl=300):
        self.ttl = ttl
        self.cache = None
        self.last_updated = 0

    def get_nodes(self):
        """Kubernetes 노드 정보를 가져옴"""
        if not self.cache or time.time() - self.last_updated > self.ttl:
            try:
                config.load_incluster_config()
            except config.ConfigException:
                config.load_kube_config(
                    context="k8sm1@kubernetes",
                    config_file="/Users/hwan/Library/Application Support/OpenLens/kubeconfigs/6ef3302a-07b0-4a54-849d-244cba341f05"
                )

            v1 = client.CoreV1Api()
            nodes = v1.list_node().items

            result = []
            for node in nodes:
                addresses = {a.type: a.address for a in node.status.addresses}
                ip = addresses.get("InternalIP", "N/A")
                hostname = addresses.get("Hostname", node.metadata.name)
                
                # 역할 판별
                labels = node.metadata.labels or {}
                if (
                    "node-role.kubernetes.io/master" in labels
                    or "node-role.kubernetes.io/control-plane" in labels
                ):
                    role = "control"
                else:
                    role = "data"
                
                # 상태 판별
                conditions = {c.type: c.status for c in node.status.conditions}
                status = "healthy" if conditions.get("Ready") == "True" else "down"

                result.append({
                    "id": node.metadata.uid,
                    "ip": ip,
                    "hostname": hostname,
                    "role": role,
                    "cpuUsage": psutil.cpu_percent(),
                    "memoryUsage": psutil.virtual_memory().percent,
                    "status": status,
                    "uptime": format_uptime(),
                })

            self.cache = result
            self.last_updated = time.time()

        return self.cache


def format_uptime():
    uptime_seconds = time.time() - psutil.boot_time()
    days, remainder = divmod(int(uptime_seconds), 86400)
    hours, minutes = divmod(remainder, 3600)
    return f"{days}d {hours}h {minutes//60}m"
