# Stage 1: Build stage - Download JDK and build the application
FROM eclipse-temurin:17-jdk-jammy AS builder
# Set working directory
WORKDIR /app
# Copy Maven wrapper and pom.xml first (for better caching)
COPY mvnw .
COPY .mvn/ .mvn/
COPY pom.xml .
# Copy source code
COPY src/ src/
# Build the application (creates executable JAR)
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime stage - Create optimized production image
FROM eclipse-temurin:17-jre-jammy AS runtime
# Install curl for health checks (optional)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# Create non-root user for security
RUN groupadd -r spring && useradd -r -g spring spring
USER spring
# Set working directory
WORKDIR /app
# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar
# Expose port
EXPOSE 9191
# Run the application with optimized JVM settings
ENTRYPOINT ["java", "-jar", "/app/app.jar"]