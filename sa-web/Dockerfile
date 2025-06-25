
FROM maven:3.9-eclipse-temurin-17  AS build

USER root
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app


COPY pom.xml ./
COPY src ./src


RUN mvn clean package -DskipTests


FROM eclipse-temurin:17-jdk-alpine

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/target/sa-web-1.0-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

