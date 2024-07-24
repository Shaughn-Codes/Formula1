package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.driverinfo.DriverInfo;
import com.example.f1_dashboard.service.DriverInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;


@Service
public class GetDriverInfoImpl implements DriverInfoService {

    private static final Logger log = LoggerFactory.getLogger(GetDriverInfoImpl.class);
    private RestTemplate restTemplate;
    String driverInfoUrl = "https://f1-motorsport-data.p.rapidapi.com/athlete-info?athleteId=";

    @Autowired
    public GetDriverInfoImpl(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    @Override
    public DriverInfo getDriverInfo(String driverID){
        try {
            HttpHeaders httpHeaders = new HttpHeaders();
            String url = driverInfoUrl + driverID;
            httpHeaders.set("x-rapidapi-key","b8c79be369msh7dc47ef713a2e9ap11bf45jsnfc0434067cd0");
            httpHeaders.set("x-rapidapi-host","f1-motorsport-data.p.rapidapi.com");
            log.info("Sending request to url: {}",url);
            log.info("Sending headers: {}",httpHeaders);
            ResponseEntity<DriverInfo> response = restTemplate.exchange(url, HttpMethod.GET,
                   new HttpEntity<>(httpHeaders),DriverInfo.class);
            log.info("Response from Driver Info API:", response.getBody().toString());
            System.out.println(response.getBody().toString());
            return response.getBody();
        }catch (Exception e){
            log.error("Unable to fetch api response: " + e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "exception " +
                    "while calling driver info api",e);
        }
    }
}
