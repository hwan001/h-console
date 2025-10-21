# --- Gradle 빌드 ---
FROM gradle:8.10.2-jdk17 AS build
WORKDIR /app

COPY ./be /app/be
COPY ./protos /app/protos

WORKDIR /app/be
RUN gradle clean generateProto build -x test

# --- 실행 ---
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/be/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
# 필요 시 프로파일 지정: , "--spring.profiles.active=test"]