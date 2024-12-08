package com.example.f1_dashboard.response;

import com.example.f1_dashboard.f1schedule.F1Schedule;

import java.util.List;
import java.util.Map;

public class F1ScheduleResponse {
    private Map<String, List<F1Schedule>> schedule;

    public Map<String, List<F1Schedule>> getSchedule() {
        return schedule;
    }

    public void setSchedule(Map<String, List<F1Schedule>> schedule) {
        this.schedule = schedule;
    }
}

