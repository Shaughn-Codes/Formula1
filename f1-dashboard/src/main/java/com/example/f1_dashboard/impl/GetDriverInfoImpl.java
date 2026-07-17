package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.client.F1ApiClient;
import com.example.f1_dashboard.driverinfo.DriverInfo;
import com.example.f1_dashboard.service.DriverInfoService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GetDriverInfoImpl implements DriverInfoService {
    private final F1ApiClient f1ApiClient;

    public GetDriverInfoImpl(F1ApiClient f1ApiClient) {
        this.f1ApiClient = f1ApiClient;
    }

    @Override
    public DriverInfo getDriverInfo(String driverID) {
        return f1ApiClient.get("/athlete-info", Map.of("athleteId", driverID), DriverInfo.class);
    }
}
