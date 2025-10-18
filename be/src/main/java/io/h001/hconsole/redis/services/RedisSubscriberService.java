package io.h001.hconsole.redis.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.h001.hconsole.global.websocket.WebSocketHandler;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriberService implements MessageListener {

    private final ObjectMapper objectMapper;
    private final WebSocketHandler webSocketHandler;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String channel = new String(message.getChannel());
            String body = new String(message.getBody());

            log.debug("[REDIS][{}] Received: {}", channel, body);
            webSocketHandler.broadcast(channel, objectMapper.readTree(body));

        } catch (Exception e) {
            log.error("[REDIS] Error while processing message", e);
        }
    }
}