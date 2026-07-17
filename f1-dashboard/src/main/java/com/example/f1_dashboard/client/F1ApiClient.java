package com.example.f1_dashboard.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Component
public class F1ApiClient {
    private static final String API_BASE_URL = "https://f1-motorsport-data.p.rapidapi.com";
    private static final String API_HOST = "f1-motorsport-data.p.rapidapi.com";

    private final RestTemplate restTemplate;
    private final String apiKey;

    public F1ApiClient(RestTemplate restTemplate, @Value("${f1.api.key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
    }

    public <T> T get(String path, Map<String, ?> queryParams, Class<T> responseType) {
        try {
            ResponseEntity<T> response = restTemplate.exchange(buildUrl(path, queryParams), HttpMethod.GET,
                    new HttpEntity<>(headers()), responseType);
            return requireBody(response.getBody());
        } catch (RestClientException exception) {
            throw upstreamFailure(exception);
        }
    }

    public <T> T get(String path, Map<String, ?> queryParams, ParameterizedTypeReference<T> responseType) {
        try {
            ResponseEntity<T> response = restTemplate.exchange(buildUrl(path, queryParams), HttpMethod.GET,
                    new HttpEntity<>(headers()), responseType);
            return requireBody(response.getBody());
        } catch (RestClientException exception) {
            throw upstreamFailure(exception);
        }
    }

    private String buildUrl(String path, Map<String, ?> queryParams) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(API_BASE_URL).path(path);
        queryParams.forEach(builder::queryParam);
        return builder.toUriString();
    }

    private HttpHeaders headers() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", apiKey);
        headers.set("x-rapidapi-host", API_HOST);
        return headers;
    }

    private <T> T requireBody(T body) {
        if (body == null) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "F1 data provider returned an empty response");
        }
        return body;
    }

    private ResponseStatusException upstreamFailure(RestClientException exception) {
        return new ResponseStatusException(HttpStatus.BAD_GATEWAY, "F1 data provider is unavailable", exception);
    }
}
