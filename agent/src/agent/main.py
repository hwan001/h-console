import time, psutil, queue, threading
from agent.sender import MetricsClient, metric_generator

q = queue.Queue()

def collect_metrics():
    cpu = psutil.cpu_percent()
    mem = psutil.virtual_memory().used / 1024 / 1024
    return {"cpu": cpu, "mem": mem, "timestamp": time.time()}

def producer():
    while True:
        data = collect_metrics()
        print(f"[PRODUCER] Collected: {data}")
        q.put(data)
        time.sleep(3)

if __name__ == "__main__":
    threading.Thread(target=producer, daemon=True).start()

    client = MetricsClient(host="localhost", port=9090)
    client.send_stream(metric_generator(q))