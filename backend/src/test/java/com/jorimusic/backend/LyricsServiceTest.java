package com.jorimusic.backend.service;

import com.jorimusic.backend.model.Lyrics;
import com.jorimusic.backend.model.Song;
import com.jorimusic.backend.repository.LyricsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class LyricsServiceTest {

    @Mock
    private LyricsRepository lyricsRepository;

    @InjectMocks
    private LyricsService lyricsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getLyricsBySongId() {
        Song song = new Song("Title", "Artist", "Album", "Genre", "path", "cover");
        song.setId(1L);
        Lyrics lyrics = new Lyrics(song, "Test Lyrics");

        when(lyricsRepository.findBySongId(1L)).thenReturn(Optional.of(lyrics));

        Optional<Lyrics> result = lyricsService.getLyricsBySongId(1L);

        assertTrue(result.isPresent());
        assertEquals(lyrics, result.get());
        verify(lyricsRepository, times(1)).findBySongId(1L);
    }

    @Test
    void saveLyrics() {
        Song song = new Song("Title", "Artist", "Album", "Genre", "path", "cover");
        song.setId(1L);
        Lyrics lyrics = new Lyrics(song, "Test Lyrics");

        when(lyricsRepository.save(lyrics)).thenReturn(lyrics);

        Lyrics result = lyricsService.saveLyrics(lyrics);

        assertEquals(lyrics, result);
        verify(lyricsRepository, times(1)).save(lyrics);
    }

    @Test
    void deleteLyrics() {
        lyricsService.deleteLyrics(1L);
        verify(lyricsRepository, times(1)).deleteById(1L);
    }
}
