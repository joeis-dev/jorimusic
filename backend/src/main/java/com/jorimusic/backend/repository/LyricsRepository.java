package com.jorimusic.backend.repository;

import com.jorimusic.backend.model.Lyrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LyricsRepository extends JpaRepository<Lyrics, Long> {
    Optional<Lyrics> findBySongId(Long songId);
}
