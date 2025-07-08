# JoriMusic Downloader Service

This is a Python Flask microservice responsible for downloading songs from external sources using `yt-dlp`.

## Getting Started

1.  **Build the application (with Docker Compose):**

    ```bash
    docker-compose up --build
    ```

    This will start the Flask application.

## Project Structure

```
downloader/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
└── Dockerfile          # Dockerfile for the downloader service
```
