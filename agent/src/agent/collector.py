import time
import logging
import threading
from NodeCache import NodeCache
from kubernetes import client, config, watch


class ClusterCollector:
    def __init__(self, q, interval=3):
        self.q = q
        self.interval = interval
        self.running = False

        logging.basicConfig(level=logging.INFO,
                            format="[%(levelname)s] %(message)s")
        self.log = logging.getLogger("collector")

        try:
            config.load_incluster_config()
            self.log.info("[ClusterCollector] Loaded in-cluster config")
        except config.ConfigException:
            config.load_kube_config(
                context="k8sm1@kubernetes",
                config_file="/Users/hwan/Library/Application Support/OpenLens/kubeconfigs/6ef3302a-07b0-4a54-849d-244cba341f05",
            )
            self.log.info("[ClusterCollector] Loaded local kubeconfig")
        self.v1 = client.CoreV1Api()

    def _collect_metrics(self):
        node_cache = NodeCache()
        nodes = node_cache.get_nodes()
        data = {
            "type": "metric",
            "timestamp": time.time(),
            "nodes": nodes,
        }
        self.log.info(f"[METRIC] Collected: {data}")
        self.q.put(data)

    def _metric_loop(self):
        while self.running:
            try:
                self._collect_metrics()
            except Exception as e:
                self.log.info(f"[METRIC] Error collecting metrics: {e}")
            time.sleep(self.interval)

    def _stream_single_container_logs(self, namespace, pod_name, container_name):
        w = watch.Watch()
        try:
            for log_line in w.stream(
                self.v1.read_namespaced_pod_log,
                name=pod_name,
                namespace=namespace,
                container=container_name,
                follow=True,
                _preload_content=True,
            ):
                log_entry = {
                    "type": "log",
                    "timestamp": time.time(),
                    "level": "INFO",
                    "message": log_line.strip(),
                }
                self.log.info(
                    f"[LOG][{pod_name}/{container_name}] {log_entry['message']}")
                self.q.put(log_entry)
        except Exception as e:
            self.log.info(f"[LOG][{pod_name}/{container_name}] Error: {e}")

    def _stream_pod_logs(self, namespace, pod_name):
        pod = self.v1.read_namespaced_pod(name=pod_name, namespace=namespace)
        containers = [c.name for c in pod.spec.containers]
        for container in containers:
            self.log.info(f"[DEBUG] Watching logs for {pod_name}/{container}")
            threading.Thread(
                target=self._stream_single_container_logs,
                args=(namespace, pod_name, container),
                daemon=True,
            ).start()

    def _start_log_collectors(self):
        self.log.info("[LOG] Starting log collectors for all pods...")
        pods = self.v1.list_pod_for_all_namespaces(watch=False).items
        for pod in pods:
            namespace = pod.metadata.namespace
            pod_name = pod.metadata.name
            threading.Thread(
                target=self._stream_pod_logs,
                args=(namespace, pod_name),
                daemon=True,
            ).start()

    def start(self):
        self.running = True
        self.log.info("[ClusterCollector] Starting metric + log collectors...")

        threading.Thread(target=self._metric_loop, daemon=True).start()
        # threading.Thread(target=self._start_log_collectors, daemon=True).start()

    def stop(self):
        self.running = False
        self.log.info("[ClusterCollector] Stopping collectors...")
        try:
            watch.Watch().stop()
        except Exception:
            pass
