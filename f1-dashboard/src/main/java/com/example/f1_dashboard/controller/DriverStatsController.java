package com.example.f1_dashboard.controller;


import com.example.f1_dashboard.driverstats.DriverStats;
import com.example.f1_dashboard.service.DriverInfoService;
import com.example.f1_dashboard.service.DriverStatsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class DriverStatsController {
    private final DriverStatsService driverStatsService;

    public DriverStatsController (DriverStatsService driverStatsService){
        this.driverStatsService=driverStatsService;
    }

    @GetMapping("/get-driver-stats/{driverID}")
    public ResponseEntity<List<DriverStats>> getDriverStats(@PathVariable String driverID){
        List<DriverStats> driverStats = driverStatsService.getDriverStats(driverID);
        return new ResponseEntity<>(driverStats, HttpStatus.OK);
    }


}
