package io.h001.hconsole.global.hasura;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Component
public class HasuraClient {

    private final WebClient webClient;

    public HasuraClient(
            @Value("${hasura.graphql.endpoint}") String endpoint,
            @Value("${hasura.graphql.admin-secret}") String adminSecret
    ) {
        this.webClient = WebClient.builder()
                .baseUrl(endpoint)
                .defaultHeader("x-hasura-admin-secret", adminSecret)
                .build();
    }

    public String query(String gql) {
        return webClient.post()
                .bodyValue(Map.of("query", gql))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}