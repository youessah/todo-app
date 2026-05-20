# ── Stage 1 : compilation ──────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copier pom.xml en premier pour profiter du cache Docker
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copier les sources et compiler
COPY src ./src
RUN mvn clean package -DskipTests -q

# ── Stage 2 : image finale légère ─────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copier uniquement le jar depuis le stage builder
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Donner les droits à l'utilisateur
RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
