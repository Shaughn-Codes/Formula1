package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.client.F1ApiClient;
import com.example.f1_dashboard.driverstats.DriverStats;
import com.example.f1_dashboard.service.DriverStatsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GetDriverStatsImpl implements DriverStatsService {
    private final F1ApiClient f1ApiClient;

    public GetDriverStatsImpl(F1ApiClient f1ApiClient) {
        this.f1ApiClient = f1ApiClient;
    }

    @Override
    public List<DriverStats> getDriverStats(String driverID) {
        DriverStats[] driverStats = f1ApiClient.get("/stats", Map.of("driverId", driverID), DriverStats[].class);
        return List.of(driverStats);
    }
}
