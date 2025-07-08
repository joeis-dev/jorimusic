package com.jorimusic.backend.controller;

import com.jorimusic.backend.model.Song;
import com.jorimusic.backend.service.SongService;
import com.jorimusic.backend.service.DownloaderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;
    private final DownloaderService downloaderService;

    public SongController(SongService songService, DownloaderService downloaderService) {
        this.songService = songService;
        this.downloaderService = downloaderService;
    }

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        Optional<Song> song = songService.getSongById(id);
        return song.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Song createSong(@RequestBody Song song) {
        return songService.saveSong(song);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(@PathVariable Long id, @RequestBody Song songDetails) {
        Optional<Song> song = songService.getSongById(id);
        if (song.isPresent()) {
            Song existingSong = song.get();
            existingSong.setTitle(songDetails.getTitle());
            existingSong.setArtist(songDetails.getArtist());
            existingSong.setAlbum(songDetails.getAlbum());
            existingSong.setGenre(songDetails.getGenre());
            existingSong.setFilePath(songDetails.getFilePath());
            existingSong.setCoverArtUrl(songDetails.getCoverArtUrl());
            return ResponseEntity.ok(songService.saveSong(existingSong));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/download")
    public ResponseEntity<String> downloadSong(@RequestBody String songName) {
        return downloaderService.downloadSong(songName)
                .map(response -> ResponseEntity.ok("Song '" + songName + "' sent for download: " + response))
                .defaultIfEmpty(ResponseEntity.status(500).body("Failed to send download request for '" + songName + "'"))
                .block(); // Blocking for simplicity, consider async handling in a real app
    }
}
