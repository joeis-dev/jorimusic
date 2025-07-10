-- V3__create_missing_tables.sql

CREATE TABLE lyrics (
    id SERIAL PRIMARY KEY,
    song_id BIGINT NOT NULL,
    text TEXT,
    FOREIGN KEY (song_id) REFERENCES music (id)
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id BIGINT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id)
);

CREATE TABLE playlist_collaborators (
    playlist_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (playlist_id, user_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE playlist_songs (
    playlist_id BIGINT NOT NULL,
    song_id BIGINT NOT NULL,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists (id),
    FOREIGN KEY (song_id) REFERENCES music (id)
);
