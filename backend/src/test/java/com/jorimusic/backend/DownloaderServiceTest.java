package com.jorimusic.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class DownloaderServiceTest {

    @Mock
    private WebClient webClientMock;

    @Mock
    private WebClient.RequestBodyUriSpec requestBodyUriSpecMock;

    @Mock
    private WebClient.RequestBodySpec requestBodySpecMock;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpecMock;

    @Mock
    private WebClient.ResponseSpec responseSpecMock;

    @InjectMocks
    private DownloaderService downloaderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Manually inject webClientMock into downloaderService
        downloaderService = new DownloaderService("http://test-downloader:5000");
        downloaderService.webClient = webClientMock; // Inject mock after construction
    }

    @Test
    void downloadSong() {
        String songName = "Test Song";
        String expectedResponse = "Download successful";

        when(webClientMock.post()).thenReturn(requestBodyUriSpecMock);
        when(requestBodyUriSpecMock.uri("/download")).thenReturn(requestBodySpecMock);
        when(requestBodySpecMock.bodyValue(anyString())).thenReturn(requestHeadersSpecMock);
        when(requestHeadersSpecMock.retrieve()).thenReturn(responseSpecMock);
        when(responseSpecMock.bodyToMono(String.class)).thenReturn(Mono.just(expectedResponse));

        Mono<String> result = downloaderService.downloadSong(songName);

        assertEquals(expectedResponse, result.block());
        verify(webClientMock, times(1)).post();
        verify(requestBodyUriSpecMock, times(1)).uri("/download");
        verify(requestBodySpecMock, times(1)).bodyValue("{\"song_name\": \"" + songName + "\"}");        verify(requestHeadersSpecMock, times(1)).retrieve();
        verify(responseSpecMock, times(1)).bodyToMono(String.class);
    }
}
