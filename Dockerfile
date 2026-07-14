# Build stage for the Spring Boot backend
FROM eclipse-temurin:25-jdk-jammy as backend-builder
WORKDIR /backend
COPY f1-dashboard/ .
RUN ./mvnw clean package -DskipTests

# Build stage for the Next.js frontend
FROM node:18-alpine as frontend-builder
WORKDIR /frontend
COPY frontend-f1-dashboard/ .
RUN npm install
RUN npm run build

# Final stage
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

# Copy backend jar
COPY --from=backend-builder /backend/target/*.jar app.jar

# Install Node.js in the final image
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy frontend files
WORKDIR /app/frontend
COPY --from=frontend-builder /frontend .

# Start both services
COPY start.sh .
RUN chmod +x start.sh
EXPOSE 3000 8080
CMD ["./start.sh"]
