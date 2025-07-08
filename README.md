# JoriMusic

JoriMusic is a personal music streaming application, similar to Spotify or Apple Music, designed to be self-hosted. It allows you to stream your personal music collection from a Network Attached Storage (NAS) and also fetch new music from external sources.

## Features

*   **Cross-Platform:** Works on both iOS and Android.
*   **User Management:** Create and manage user accounts.
*   **Personalized Experience:** Each user has their own playlists, homepage, and settings.
*   **Local & Remote Streaming:** Access your music library from your local network or over the internet.
*   **Offline Mode:** Download your favorite songs for offline listening.
*   **Multi-Language Support:** The user interface is available in English and Spanish.
*   **Customizable UI:** Change the color palette of the application to your liking.
*   **External Music Fetching:** Request new songs to be downloaded from external sources.
*   **Collaborative Playlists:** Share and edit playlists with other users.
*   **Lyrics Integration:** View the lyrics of the currently playing song.
*   **Social Sharing:** Share your favorite songs and playlists.
*   **Advanced Playback Controls:** Enjoy features like crossfade and gapless playback.

## Tech Stack

*   **Frontend:** React Native (TypeScript)
*   **Backend:** Spring Boot (Java)
*   **Downloader Service:** Python (Flask)
*   **Database:** PostgreSQL
*   **Containerization:** Docker & Docker Compose

## Project Structure

```
jorimusic/
├── backend/         # Spring Boot application
├── downloader/      # Python Flask application for downloading songs
├── frontend/        # React Native application
├── docker-compose.yml
└── README.md
```

## Getting Started

Please refer to the `README.md` file in each service's directory for specific instructions on how to set up and run the individual components of the application.

## Publishing

For instructions on how to publish the application to the app stores, please refer to the `PUBLISHING.md` file.
