package com.jorimusic.backend.repository;

import com.jorimusic.backend.model.Playlist;
import com.jorimusic.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByOwner(User owner);
}
