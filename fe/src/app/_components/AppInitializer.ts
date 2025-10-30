"use client";

import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useResponsiveStore } from "@/app/_stores/ResponsiveStore";
import { useWebSocketStore } from "@/app/_stores/WebSocketStore";

export default function AppInitializer() {
  const connect = useWebSocketStore((s) => s.connect);
  const isConnected = useWebSocketStore((s) => s.isConnected);

  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"));
  const setIsMobile = useResponsiveStore((s) => s.setIsMobile);

  useEffect(() => {
    if (!isConnected) connect();
  }, [isConnected, connect]);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery, setIsMobile]);

  return null;
}