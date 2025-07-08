package com.jorimusic.backend.controller;

import com.jorimusic.backend.model.Lyrics;
import com.jorimusic.backend.service.LyricsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/lyrics")
public class LyricsController {

    private final LyricsService lyricsService;

    public LyricsController(LyricsService lyricsService) {
        this.lyricsService = lyricsService;
    }

    @GetMapping("/song/{songId}")
    public ResponseEntity<Lyrics> getLyricsBySongId(@PathVariable Long songId) {
        Optional<Lyrics> lyrics = lyricsService.getLyricsBySongId(songId);
        return lyrics.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lyrics createLyrics(@RequestBody Lyrics lyrics) {
        return lyricsService.saveLyrics(lyrics);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLyrics(@PathVariable Long id) {
        lyricsService.deleteLyrics(id);
        return ResponseEntity.noContent().build();
    }
}
