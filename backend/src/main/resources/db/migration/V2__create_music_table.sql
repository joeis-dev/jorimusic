-- V2__create_music_table.sql

CREATE TABLE music (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    genre VARCHAR(255),
    file_path VARCHAR(255) NOT NULL,
    cover_art_url VARCHAR(255)
);
