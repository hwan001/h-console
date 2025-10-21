# h-console

### Architecture
```mermaid
graph RL
    subgraph oauthProviders["OAuth Providers"]
        oauthProvidersGoogle["Google App (OAuth2.0)"]
    end

    subgraph server["server"]
        serverProxy["reverse proxy"]
        
        subgraph serverFE["FE"]
            serverFE1["FE1"]
            serverFE2["FE2"]
        end

        subgraph serverBE["BE"]
            serverBE1["BE1"]
            serverBE2["BE2"]
            serverBE3["BE3"]
        end
        
        subgraph serverRedis["redis (Aggregated, Central Store)"]
            serverRedis1["Redis1"]
        end
    end

    subgraph cluster1["cluster 1"]
        cluster1_agent["Agent"] 
        cluster1_agent -.gRPC.-> serverBE
    end

    subgraph cluster2["cluster 2"]
        cluster2_agent["Agent"]
        cluster2_agent -.gRPC.-> serverBE
    end

    subgraph dataapilayer["Data API Layer"]
        dataapilayerHasura["Hasura"]
    end
    
    subgraph datalayer["Database"]
        datalayerPostgresql["Postgresql"]
    end
    
    users --> serverProxy
    serverProxy --/--> serverFE
    serverProxy --/api--> serverBE
    serverFE <--ws/api--> serverBE
    serverBE <--HTTPS--> dataapilayerHasura
    serverBE <--> serverRedis
    
    dataapilayerHasura <--> datalayerPostgresql

    serverBE <--API--> oauthProvidersGoogle
    serverBE <--API--> OpenAI?
    
```


### 배포 구조

- 로컬 개발/ 테스트: 각 디렉토리 Makefile 활용
- CI(GHA): Dockerfile, root Makefile 활용
- CD: gitops/ helm, ghcr 또는 oci 활용
    - 작성 중
- /에서 Makefile 로 로컬 도커 이미지 빌드, GHA 빌드 가능
    ```sh
    make build fe # make build fe be agent 로 여러개도 가능
    make deploy fe # make deploy fe be agent -> 동일
    ```