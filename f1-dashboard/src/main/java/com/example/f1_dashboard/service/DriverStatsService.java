package com.example.f1_dashboard.service;


import com.example.f1_dashboard.driverstats.DriverStats;

import java.util.List;

public interface DriverStatsService {
    List<DriverStats> getDriverStats(String driverID);
}
