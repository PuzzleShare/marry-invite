package com.marry_invite.map.service;

import com.marry_invite.map.dto.MarkerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class NaverMapService {

    @Value("${naver.map.client-id}")
    private String clientId;

    @Value("${naver.map.client-secret}")
    private String clientSecret;

    private final String BASE_URL = "https://maps.apigw.ntruss.com/map-geocode/v2/geocode";

    private final WebClient webClient;
    public NaverMapService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://maps.apigw.ntruss.com/map-geocode/v2/geocode").build();
    }

    public MarkerResponse getCoordinates(String query) {
        // 요청 URL 및 헤더 설정
        String url = BASE_URL + "?query=" + query;

        try {
            // WebClient를 사용하여 GET 요청 보내기
            Mono<Map> responseMono = webClient.get()
                    .uri(url)
                    .header("X-NCP-APIGW-API-KEY-ID", clientId)
                    .header("X-NCP-APIGW-API-KEY", clientSecret)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(Map.class);  // 응답 본문을 Map으로 변환

            // 동기적으로 응답 받기
            Map<String, Object> data = responseMono.block();

            // 응답에서 필요한 정보 추출
            if (data != null && data.containsKey("addresses")) {
                var addresses = (List<Map<String, Object>>) data.get("addresses");
                if (!addresses.isEmpty()) {
                    Map<String, Object> addressInfo = addresses.get(0);
                    String roadAddress = (String) addressInfo.get("roadAddress");
                    String jibunAddress = (String) addressInfo.get("jibunAddress");
                    String x = (String) addressInfo.get("x");
                    String y = (String) addressInfo.get("y");

                    // 필요한 값만 MarkerResponse DTO에 담기
                    MarkerResponse markerResponse = new MarkerResponse(roadAddress, jibunAddress, x, y);

                    return markerResponse;
                }
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid response from Naver API");

        } catch (Exception e) {
            throw new RuntimeException("API 요청 실패", e);
        }
    }
}
