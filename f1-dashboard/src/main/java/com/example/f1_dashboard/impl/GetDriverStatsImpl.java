package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.driverstats.DriverStats;
import com.example.f1_dashboard.service.DriverInfoService;
import com.example.f1_dashboard.service.DriverStatsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;


@Service
public class GetDriverStatsImpl implements DriverStatsService {
    private RestTemplate restTemplate;
    private String driversStatsUrl = "https://f1-motorsport-data.p.rapidapi.com/stats?driverId=";
    private static final Logger log = LoggerFactory.getLogger(GetDriverInfoImpl.class);


    @Autowired
    public GetDriverStatsImpl(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    @Override
    public List<DriverStats> getDriverStats(String driverID) {
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            String url = driversStatsUrl + driverID;
            httpHeaders.set("x-rapidapi-key","b8c79be369msh7dc47ef713a2e9ap11bf45jsnfc0434067cd0");
            httpHeaders.set("x-rapidapi-host","f1-motorsport-data.p.rapidapi.com");
            log.info("Sending request to url: {}",url);
            log.info("Sending headers: {}",httpHeaders);
            ResponseEntity<DriverStats[]> response = restTemplate.exchange(url, HttpMethod.GET,
                    new HttpEntity<>(httpHeaders), DriverStats[].class);
            DriverStats[] driverStatsArray = response.getBody();
            if(driverStatsArray != null){
                log.info("Response from Driver Stats API: {}", Arrays.toString(driverStatsArray));
                return Arrays.asList(driverStatsArray);
            } else {
                throw new RuntimeException("Failed to fetch driver stats");
            }
        }catch (Exception e){
            log.error("Unable to fetch api response: " + e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "exception " +
                    "while calling driver stats api",e);
        }
    }
}
