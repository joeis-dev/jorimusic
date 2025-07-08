# JoriMusic Backend

This is the Spring Boot backend application for JoriMusic.

## Getting Started

1.  **Build the application:**

    ```bash
    ./mvnw clean install
    ```

2.  **Run the application (with Docker Compose):**

    ```bash
    docker-compose up --build
    ```

    This will start the Spring Boot application and the PostgreSQL database.

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/jorimusic/backend/
│   │   │       ├── config/       # Spring Security and other configurations
│   │   │       ├── controller/   # REST API controllers
│   │   │       ├── model/        # JPA entities
│   │   │       ├── payload/      # Request and response DTOs
│   │   │       ├── repository/   # Spring Data JPA repositories
│   │   │       ├── security/     # JWT related classes
│   │   │       └── service/      # Business logic and UserDetails service
│   │   └── resources/  # Application properties
│   └── test/
│       └── java/       # Unit and integration tests
├── pom.xml             # Maven project file
└── Dockerfile          # Dockerfile for the backend service
```
