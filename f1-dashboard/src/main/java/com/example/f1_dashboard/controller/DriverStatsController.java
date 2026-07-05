package com.example.f1_dashboard.controller;


import com.example.f1_dashboard.driverstats.DriverStats;
import com.example.f1_dashboard.service.DriverInfoService;
import com.example.f1_dashboard.service.DriverStatsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://quali.onrender.com/"})
public class DriverStatsController {
    private static final Logger log = LoggerFactory.getLogger(DriverStatsController.class);

    private final DriverStatsService driverStatsService;

    public DriverStatsController (DriverStatsService driverStatsService){
        this.driverStatsService=driverStatsService;
    }

    @GetMapping("/get-driver-stats/{driverID}")
    public ResponseEntity<List<DriverStats>> getDriverStats(@PathVariable String driverID){
        log.info("SECURITY-EVENT: GET /get-driver-stats called with driverID={}", driverID);
        try {
            List<DriverStats> driverStats = driverStatsService.getDriverStats(driverID);
            log.info("SECURITY-EVENT: GET /get-driver-stats succeeded for driverID={}", driverID);
            return new ResponseEntity<>(driverStats, HttpStatus.OK);
        } catch (Exception e) {
            log.error("SECURITY-EVENT: GET /get-driver-stats failed for driverID={}: {}", driverID, e.getMessage());
            throw e;
        }
    }


}
