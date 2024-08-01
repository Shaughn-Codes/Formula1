package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.f1news.F1News;
import com.example.f1_dashboard.service.F1NewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@Service
public class F1NewsImpl implements F1NewsService {

    @Autowired
    public F1NewsImpl(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    private static final Logger log = LoggerFactory.getLogger(F1NewsImpl.class);
    @Value("${f1.api.key}")
    private String apikey;
    private String f1NewsUrl = "https://f1-motorsport-data.p.rapidapi.com/news?limit=";
    private RestTemplate restTemplate;


    @Override
    public List<F1News> getF1News(String limit) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            String url = f1NewsUrl + limit;
            httpHeaders.set("x-rapidapi-key",apikey);
            httpHeaders.set("x-rapidapi-host","f1-motorsport-data.p.rapidapi.com");
            log.info("sending request to: {}",url);
            log.info("Setting headers: {}", httpHeaders);
            ResponseEntity<F1News[]> response = restTemplate.exchange(url, HttpMethod.GET,
                    new HttpEntity<>(httpHeaders),F1News[].class);
            F1News[] f1NewsArray = response.getBody();
            if (f1NewsArray != null) {
                log.info("Response from F1 News: ", Arrays.toString(f1NewsArray));
                return List.of(f1NewsArray);
            } else {
                throw new RuntimeException("Failed to fetch f1 news");
            }
        }catch (Exception e){
            log.error("Unable to fetch f1 api response: " + e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Exception while calling f1 news api", e);
        }
    }
}
