"use client";

import { useEffect } from "react";
import { useWebSocketStore } from "@/app/_stores/WebSocketStore";

export default function AppInitializer() {
  const connect = useWebSocketStore((s) => s.connect);
  const isConnected = useWebSocketStore((s) => s.isConnected);

  useEffect(() => {
    if (!isConnected) connect();
  }, [isConnected, connect]);

  return null;
}