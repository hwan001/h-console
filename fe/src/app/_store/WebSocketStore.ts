"use client"
import { create } from "zustand"

type WSMessage = {
  channel: string
  payload: any
}

interface WebSocketState {
  socket: WebSocket | null
  channels: Record<string, ((msg: WSMessage) => void)[]>
  connect: () => void
  disconnect: () => void
  send: (msg: WSMessage) => void
  subscribe: (channel: string, handler: (msg: WSMessage) => void) => void
  unsubscribe: (channel: string, handler: (msg: WSMessage) => void) => void
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  channels: {},

  connect: () => {
    if (get().socket) return

    const ws = new WebSocket("ws://localhost:8080/ws")

    ws.onopen = () => {
      console.log("✅ WebSocket connected")
    }

    ws.onmessage = (event) => {
      const msg: WSMessage = JSON.parse(event.data)
      const handlers = get().channels[msg.channel] || []
      handlers.forEach((h) => h(msg))
    }

    ws.onclose = () => {
      console.log("❌ WebSocket closed, retrying...")
      set({ socket: null })
      setTimeout(() => get().connect(), 2000) // 재연결
    }

    set({ socket: ws })
  },

  disconnect: () => {
    get().socket?.close()
    set({ socket: null })
  },

  send: (msg: WSMessage) => {
    get().socket?.send(JSON.stringify(msg))
  },

  subscribe: (channel, handler) => {
    set((state) => {
      const handlers = state.channels[channel] || []
      return {
        channels: { ...state.channels, [channel]: [...handlers, handler] },
      }
    })
    // 서버에도 subscribe 요청
    get().send({ channel: "control", payload: { action: "subscribe", channel } })
  },

  unsubscribe: (channel, handler) => {
    set((state) => {
      const handlers = state.channels[channel] || []
      return {
        channels: {
          ...state.channels,
          [channel]: handlers.filter((h) => h !== handler),
        },
      }
    })
    // 서버에도 unsubscribe 요청
    get().send({ channel: "control", payload: { action: "unsubscribe", channel } })
  },
}))