package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.client.F1ApiClient;
import com.example.f1_dashboard.f1schedule.F1Schedule;
import com.example.f1_dashboard.service.F1ScheduleService;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class F1ScheduleImpl implements F1ScheduleService {
    private final F1ApiClient f1ApiClient;

    public F1ScheduleImpl(F1ApiClient f1ApiClient) {
        this.f1ApiClient = f1ApiClient;
    }

    @Override
    public Map<String, List<F1Schedule>> getF1Schedule(String year) {
        return f1ApiClient.get("/schedule", Map.of("year", year),
                new ParameterizedTypeReference<Map<String, List<F1Schedule>>>() {});
    }
}
