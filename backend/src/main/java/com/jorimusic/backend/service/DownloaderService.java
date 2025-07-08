package com.jorimusic.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class DownloaderService {

    WebClient webClient;

    public DownloaderService(@Value("${downloader.service.url}") String downloaderServiceUrl) {
        this.webClient = WebClient.builder().baseUrl(downloaderServiceUrl).build();
    }

    public Mono<String> downloadSong(String songName) {
        return webClient.post()
                .uri("/download")
                .bodyValue("{\"song_name\": \"" + songName + "\"}")
                .retrieve()
                .bodyToMono(String.class);
    }
}
