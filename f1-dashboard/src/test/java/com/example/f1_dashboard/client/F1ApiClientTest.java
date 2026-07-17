package com.example.f1_dashboard.client;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class F1ApiClientTest {
    private final RestTemplate restTemplate = new RestTemplate();
    private final MockRestServiceServer server = MockRestServiceServer.bindTo(restTemplate).build();
    private final F1ApiClient client = new F1ApiClient(restTemplate, "test-key");

    @Test
    void sendsConfiguredHeadersAndReturnsTheResponseBody() {
        server.expect(once(), requestTo("https://f1-motorsport-data.p.rapidapi.com/news?limit=3"))
                .andExpect(method(HttpMethod.GET))
                .andExpect(header("x-rapidapi-key", "test-key"))
                .andExpect(header("x-rapidapi-host", "f1-motorsport-data.p.rapidapi.com"))
                .andRespond(withSuccess("{\"headline\":\"Race news\"}", MediaType.APPLICATION_JSON));

        NewsResponse response = client.get("/news", Map.of("limit", 3), NewsResponse.class);

        assertThat(response.headline()).isEqualTo("Race news");
        server.verify();
    }

    @Test
    void rejectsAnEmptyProviderResponse() {
        server.expect(requestTo("https://f1-motorsport-data.p.rapidapi.com/news?limit=3"))
                .andRespond(withSuccess());

        assertThatThrownBy(() -> client.get("/news", Map.of("limit", 3), NewsResponse.class))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("empty response");
    }

    private record NewsResponse(String headline) {
    }
}
