FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar
RUN chmod +x app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
