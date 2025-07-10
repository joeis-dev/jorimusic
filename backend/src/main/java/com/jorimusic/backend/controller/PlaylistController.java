package com.jorimusic.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.jorimusic.backend.model.Playlist;
import com.jorimusic.backend.model.Song;
import com.jorimusic.backend.model.User;
import com.jorimusic.backend.repository.UserRepository;
import com.jorimusic.backend.service.PlaylistService;
import com.jorimusic.backend.service.SongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;
    private final SongService songService;
    private final UserRepository userRepository;

    public PlaylistController(PlaylistService playlistService, SongService songService, UserRepository userRepository) {
        this.playlistService = playlistService;
        this.songService = songService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Playlist> getAllPlaylists() {
        // In a real application, you would get the authenticated user here
        // For now, we'll return all playlists or a default user's playlists
        return playlistService.getAllPlaylists();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Playlist>> getPlaylistsByUser(@PathVariable Long userId) {
        // This is a placeholder. In a real app, you'd get the user from the security context.
        // For now, we'll fetch a dummy user or assume the user exists.
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<Playlist> playlists = playlistService.getPlaylistsByOwner(userOptional.get());
            return ResponseEntity.ok(playlists);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable Long id) {
        Optional<Playlist> playlist = playlistService.getPlaylistById(id);
        return playlist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Playlist createPlaylist(@RequestBody Playlist playlist) {
        return playlistService.savePlaylist(playlist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable Long id, @RequestBody Playlist playlistDetails) {
        Optional<Playlist> playlist = playlistService.getPlaylistById(id);
        if (playlist.isPresent()) {
            Playlist existingPlaylist = playlist.get();
            existingPlaylist.setName(playlistDetails.getName());
            existingPlaylist.setOwner(playlistDetails.getOwner());
            existingPlaylist.setSongs(playlistDetails.getSongs());
            existingPlaylist.setCollaborators(playlistDetails.getCollaborators());
            return ResponseEntity.ok(playlistService.savePlaylist(existingPlaylist));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        playlistService.deletePlaylist(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Playlist> addSongToPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        Optional<Playlist> playlistOptional = playlistService.getPlaylistById(playlistId);
        Optional<Song> songOptional = songService.getSongById(songId);

        if (playlistOptional.isPresent() && songOptional.isPresent()) {
            Playlist playlist = playlistOptional.get();
            Song song = songOptional.get();
            playlist.getSongs().add(song);
            return ResponseEntity.ok(playlistService.savePlaylist(playlist));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> removeSongFromPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        Optional<Playlist> playlistOptional = playlistService.getPlaylistById(playlistId);
        Optional<Song> songOptional = songService.getSongById(songId);

        if (playlistOptional.isPresent() && songOptional.isPresent()) {
            Playlist playlist = playlistOptional.get();
            Song song = songOptional.get();
            playlist.getSongs().remove(song);
            playlistService.savePlaylist(playlist);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{playlistId}/invite/{userId}")
    public ResponseEntity<Playlist> inviteUserToPlaylist(@PathVariable Long playlistId, @PathVariable Long userId) {
        Optional<Playlist> playlistOptional = playlistService.getPlaylistById(playlistId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (playlistOptional.isPresent() && userOptional.isPresent()) {
            Playlist playlist = playlistOptional.get();
            User user = userOptional.get();
            playlist.getCollaborators().add(user);
            return ResponseEntity.ok(playlistService.savePlaylist(playlist));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
