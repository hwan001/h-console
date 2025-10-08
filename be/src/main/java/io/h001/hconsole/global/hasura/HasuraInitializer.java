package io.h001.hconsole.global.hasura;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class HasuraInitializer {

    private final WebClient webClient;

    @Value("${hasura.graphql.endpoint}")
    private String hasuraEndpoint;

    @Value("${hasura.graphql.admin-secret}")
    private String adminSecret;

    @PostConstruct
    public void initializeHasuraMetadata() {
        log.info("Initializing Hasura: creating and tracking `clusters` table...");

        // 1. CREATE TABLE (via Hasura SQL API)
        String sqlBody = """
                    {
                      "type": "run_sql",
                      "args": {
                        "source": "default",
                        "sql": "CREATE TABLE IF NOT EXISTS clusters (id SERIAL PRIMARY KEY, name TEXT NOT NULL, status TEXT DEFAULT 'inactive', created_at TIMESTAMP DEFAULT NOW());"
                      }
                    }
                """;

        String sqlUrl = hasuraEndpoint.replace("/v1/graphql", "/v2/query");

        webClient.post()
                .uri(sqlUrl)
                .header("x-hasura-admin-secret", adminSecret)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(sqlBody)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> log.info("Table creation via Hasura SQL API: {}", response))
                .doOnError(e -> log.warn("Table creation failed: {}", e.getMessage()))
                .then(trackClustersTable()) // 테이블 생성 후 track 시도
                .subscribe();
    }

    private Mono<String> trackClustersTable() {
        String metadataUrl = hasuraEndpoint.replace("/v1/graphql", "/v1/metadata");

        String trackBody = """
                    {
                      "type": "pg_track_table",
                      "args": {
                        "source": "default",
                        "schema": "public",
                        "name": "clusters"
                      }
                    }
                """;

        return webClient.post()
                .uri(metadataUrl)
                .header("x-hasura-admin-secret", adminSecret)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(trackBody)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> log.info("Table tracking response: {}", response))
                .onErrorResume(WebClientResponseException.class, e -> {
                    String body = e.getResponseBodyAsString();
                    if (body.contains("already-tracked")) {
                        log.info("Table already tracked — skipping.");
                        return Mono.empty();
                    } else {
                        log.warn("Failed to track clusters table: {}", body);
                        return Mono.empty();
                    }
                });
    }
}