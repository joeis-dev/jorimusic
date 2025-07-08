package com.jorimusic.backend.service;

import com.jorimusic.backend.model.Playlist;
import com.jorimusic.backend.model.User;
import com.jorimusic.backend.repository.PlaylistRepository;
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

public class PlaylistServiceTest {

    @Mock
    private PlaylistRepository playlistRepository;

    @InjectMocks
    private PlaylistService playlistService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllPlaylists() {
        User user = new User("testuser", "password");
        Playlist playlist1 = new Playlist("Playlist1", user);
        Playlist playlist2 = new Playlist("Playlist2", user);
        List<Playlist> playlists = Arrays.asList(playlist1, playlist2);

        when(playlistRepository.findAll()).thenReturn(playlists);

        List<Playlist> result = playlistService.getAllPlaylists();

        assertEquals(2, result.size());
        verify(playlistRepository, times(1)).findAll();
    }

    @Test
    void getPlaylistById() {
        User user = new User("testuser", "password");
        Playlist playlist = new Playlist("Playlist1", user);
        playlist.setId(1L);

        when(playlistRepository.findById(1L)).thenReturn(Optional.of(playlist));

        Optional<Playlist> result = playlistService.getPlaylistById(1L);

        assertEquals(playlist, result.get());
        verify(playlistRepository, times(1)).findById(1L);
    }

    @Test
    void savePlaylist() {
        User user = new User("testuser", "password");
        Playlist playlist = new Playlist("Playlist1", user);

        when(playlistRepository.save(playlist)).thenReturn(playlist);

        Playlist result = playlistService.savePlaylist(playlist);

        assertEquals(playlist, result);
        verify(playlistRepository, times(1)).save(playlist);
    }

    @Test
    void deletePlaylist() {
        playlistService.deletePlaylist(1L);
        verify(playlistRepository, times(1)).deleteById(1L);
    }

    @Test
    void getPlaylistsByUser() {
        User user = new User("testuser", "password");
        Playlist playlist1 = new Playlist("Playlist1", user);
        Playlist playlist2 = new Playlist("Playlist2", user);
        List<Playlist> playlists = Arrays.asList(playlist1, playlist2);

        when(playlistRepository.findByOwner(user)).thenReturn(playlists);

        List<Playlist> result = playlistService.getPlaylistsByOwner(user);

        assertEquals(2, result.size());
        verify(playlistRepository, times(1)).findByOwner(user);
    }
}
