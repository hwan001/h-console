package io.h001.hconsole.global.websocket;

import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    // 세션별 구독 채널
    private final Map<WebSocketSession, Set<String>> sessionChannels = new ConcurrentHashMap<>();

    // 채널별 구독 세션
    private final Map<String, Set<WebSocketSession>> channelSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessionChannels.put(session, ConcurrentHashMap.newKeySet());
        System.out.println("WebSocket connected: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Map<String, Object> msg = objectMapper.readValue(message.getPayload(), Map.class);
        String channel = (String) msg.get("channel");
        Object payload = msg.get("payload");

        // 레이턴시 측정용
        if ("system".equals(channel) && "ping".equals(payload)) {
            session.sendMessage(new TextMessage(
                objectMapper.writeValueAsString(Map.of("channel", "system", "payload", "pong"))
            ));
            return;
        }

        // 구독 관리용 control 채널 처리
        if ("control".equals(channel)) {
            handleControlMessage(session, payload);
            return;
        }

        // 일반 메시지 — 해당 채널 구독자에게 브로드캐스트
        broadcast(channel, payload);
    }

    private void handleControlMessage(WebSocketSession session, Object payload) {
        if (!(payload instanceof Map)) return;
        Map<String, Object> control = (Map<String, Object>) payload;
        String action = (String) control.get("action");
        String targetChannel = (String) control.get("channel");

        if (targetChannel == null) return;

        switch (action) {
            case "subscribe" -> subscribe(session, targetChannel);
            case "unsubscribe" -> unsubscribe(session, targetChannel);
            default -> System.out.println("⚠️ Unknown control action: " + action);
        }
    }

    private void subscribe(WebSocketSession session, String channel) {
        sessionChannels.computeIfAbsent(session, s -> ConcurrentHashMap.newKeySet()).add(channel);
        channelSessions.computeIfAbsent(channel, c -> ConcurrentHashMap.newKeySet()).add(session);
        System.out.println("session id : " + session.getId() + ", subscribed to " + channel);
    }

    private void unsubscribe(WebSocketSession session, String channel) {
        Set<String> userChannels = sessionChannels.get(session);
        if (userChannels != null) {
            userChannels.remove(channel);
        }

        Set<WebSocketSession> channelSubs = channelSessions.get(channel);
        if (channelSubs != null) {
            channelSubs.remove(session);
            if (channelSubs.isEmpty()) {
                channelSessions.remove(channel);
            }
        }

        System.out.println("session id : " + session.getId() + ", unsubscribed from " + channel);
    }

    private void broadcast(String channel, Object payload) throws Exception {
        Set<WebSocketSession> sessions = channelSessions.getOrDefault(channel, Collections.emptySet());
        if (sessions.isEmpty()) return;

        Map<String, Object> msg = Map.of("channel", channel, "payload", payload);
        String json = objectMapper.writeValueAsString(msg);

        for (WebSocketSession s : sessions) {
            if (s.isOpen()) s.sendMessage(new TextMessage(json));
        }

        System.out.println("Broadcast to " + channel + " (" + sessions.size() + " clients)");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        Set<String> channels = sessionChannels.remove(session);
        if (channels != null) {
            for (String ch : channels) {
                Set<WebSocketSession> sessions = channelSessions.get(ch);
                if (sessions != null) {
                    sessions.remove(session);
                    if (sessions.isEmpty()) channelSessions.remove(ch);
                }
            }
        }
        System.out.println("WebSocket disconnected: " + session.getId());
    }
}