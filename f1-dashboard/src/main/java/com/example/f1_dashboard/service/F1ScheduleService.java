package com.example.f1_dashboard.service;

import com.example.f1_dashboard.f1schedule.F1Schedule;

import java.util.List;
import java.util.Map;


public interface F1ScheduleService {
    Map<String, List<F1Schedule>> getF1Schedule(String year);
}
