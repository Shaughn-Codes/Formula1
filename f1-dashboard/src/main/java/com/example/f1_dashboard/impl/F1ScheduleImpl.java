package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.f1schedule.F1Schedule;
import com.example.f1_dashboard.service.F1ScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class F1ScheduleImpl implements F1ScheduleService {
    private static final Logger log = LoggerFactory.getLogger(GetDriverInfoImpl.class);
    private RestTemplate restTemplate;
    String f1ScheduleUrl = "https://f1-motorsport-data.p.rapidapi.com/schedule?year=";
    @Value("${f1.api.key}")
    private String apiKey;

    @Autowired
    public  F1ScheduleImpl(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    @Override
    public Map<String, List<F1Schedule>> getF1Schedule(String year) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            String url = f1ScheduleUrl + year;
            httpHeaders.set("x-rapidapi-key",apiKey);
            httpHeaders.set("x-rapidapi-host","f1-motorsport-data.p.rapidapi.com");
            log.info("Sending request to url: {}",url);
            log.info("Sending headers: {}",httpHeaders);
            ResponseEntity<Map<String,List<F1Schedule>>> response = restTemplate.exchange(url, HttpMethod.GET,
                    new HttpEntity<>(httpHeaders),(Class<Map<String,List<F1Schedule>>>) (Object)Map.class);
            log.info("Response from F1 Schedule API:", response.getBody().toString());
            System.out.println(response.getBody().toString());
            return response.getBody();

        } catch (Exception e) {
            log.error("Unable to fetch api repsonse: " + e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"exception"
            + "while calling f1 schdule api", e);
        }
    }

}
