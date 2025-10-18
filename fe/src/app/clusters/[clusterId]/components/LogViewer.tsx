"use client";
import { useEffect, useRef, useState } from "react";
import { useWebSocketStore, WSMessage } from "@/app/_stores/WebSocketStore";

export default function LogViewer({ clusterId }: { clusterId: string }) {
  const { connect, subscribe, unsubscribe } = useWebSocketStore();
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    connect();

    const handler = (msg: WSMessage) => {
      if (typeof msg.payload === "string") {
        setLogs((prev) => [...prev, msg.payload]);
      }
    };

    const channel = `cluster-${clusterId}:logs`;
    subscribe(channel, handler);
    return () => unsubscribe(channel, handler);
  }, [clusterId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      className="
        p-4 sm:p-6 
        bg-black text-green-400 font-mono text-sm 
        h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh]
        w-full max-w-full
        overflow-y-auto rounded-lg shadow-inner resize
      "
    >
      {logs.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
}