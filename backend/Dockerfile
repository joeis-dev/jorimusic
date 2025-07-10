FROM openjdk:17-jdk-slim

ARG FLYWAY_VERSION=9.22.3

RUN apt-get update &&     apt-get install -y --no-install-recommends curl tar gzip unzip &&     apt-get clean &&     rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN curl -L "https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}-linux-x64.tar.gz" -o flyway-commandline.tar.gz && \
    mkdir -p /opt/flyway && \
    tar -xzf flyway-commandline.tar.gz --strip-components=1 -C /opt/flyway && \
    rm flyway-commandline.tar.gz

ENV PATH="/opt/flyway:${PATH}"

COPY target/*.jar app.jar
RUN chmod +x app.jar

WORKDIR /app

RUN jar xf app.jar BOOT-INF/classes/db/migration/V1__initial_schema.sql &&     mkdir -p /tmp/migrations &&     mv BOOT-INF/classes/db/migration/V1__initial_schema.sql /tmp/migrations/V1__initial_schema.sql

WORKDIR /app

ENTRYPOINT ["/bin/bash", "-c", "flyway -url=jdbc:postgresql://db:5432/jorimusic -user=jorimusic -password=jorimusic -cleanDisabled=false clean && flyway -url=jdbc:postgresql://db:5432/jorimusic -user=jorimusic -password=jorimusic -locations=filesystem:/tmp/migrations -baselineOnMigrate=true migrate && java -jar app.jar"]
