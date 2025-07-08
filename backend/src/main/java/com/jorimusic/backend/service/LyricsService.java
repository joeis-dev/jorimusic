package com.jorimusic.backend.service;

import com.jorimusic.backend.model.Lyrics;
import com.jorimusic.backend.repository.LyricsRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LyricsService {

    private final LyricsRepository lyricsRepository;

    public LyricsService(LyricsRepository lyricsRepository) {
        this.lyricsRepository = lyricsRepository;
    }

    public Optional<Lyrics> getLyricsBySongId(Long songId) {
        return lyricsRepository.findBySongId(songId);
    }

    public Lyrics saveLyrics(Lyrics lyrics) {
        return lyricsRepository.save(lyrics);
    }

    public void deleteLyrics(Long id) {
        lyricsRepository.deleteById(id);
    }
}
