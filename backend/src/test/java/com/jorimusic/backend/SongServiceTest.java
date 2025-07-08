package com.jorimusic.backend.service;

import com.jorimusic.backend.model.Song;
import com.jorimusic.backend.repository.SongRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class SongServiceTest {

    @Mock
    private SongRepository songRepository;

    @InjectMocks
    private SongService songService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllSongs() {
        Song song1 = new Song("Title1", "Artist1", "Album1", "Genre1", "path1", "cover1");
        Song song2 = new Song("Title2", "Artist2", "Album2", "Genre2", "path2", "cover2");
        List<Song> songs = Arrays.asList(song1, song2);

        when(songRepository.findAll()).thenReturn(songs);

        List<Song> result = songService.getAllSongs();

        assertEquals(2, result.size());
        verify(songRepository, times(1)).findAll();
    }

    @Test
    void getSongById() {
        Song song = new Song("Title1", "Artist1", "Album1", "Genre1", "path1", "cover1");
        song.setId(1L);

        when(songRepository.findById(1L)).thenReturn(Optional.of(song));

        Optional<Song> result = songService.getSongById(1L);

        assertEquals(song, result.get());
        verify(songRepository, times(1)).findById(1L);
    }

    @Test
    void saveSong() {
        Song song = new Song("Title1", "Artist1", "Album1", "Genre1", "path1", "cover1");

        when(songRepository.save(song)).thenReturn(song);

        Song result = songService.saveSong(song);

        assertEquals(song, result);
        verify(songRepository, times(1)).save(song);
    }

    @Test
    void deleteSong() {
        songService.deleteSong(1L);
        verify(songRepository, times(1)).deleteById(1L);
    }
}
