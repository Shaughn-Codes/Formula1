package com.example.f1_dashboard.controller;

import com.example.f1_dashboard.f1schedule.F1Schedule;
import com.example.f1_dashboard.service.F1ScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class F1ScheduleController {
    private static final Logger log = LoggerFactory.getLogger(F1ScheduleController.class);

    private final F1ScheduleService f1ScheduleService;
    public F1ScheduleController(F1ScheduleService f1ScheduleService){
        this.f1ScheduleService = f1ScheduleService;
    }
    @GetMapping("/get-f1-schedule/{year}")
    public ResponseEntity<Map<String, List<F1Schedule>>> getF1Schedule(@PathVariable String year){
        log.info("SECURITY-EVENT: GET /get-f1-schedule called with year={}", year);
        try {
            Map<String,List<F1Schedule>> f1Schedule = f1ScheduleService.getF1Schedule(year);
            log.info("SECURITY-EVENT: GET /get-f1-schedule succeeded for year={}", year);
            return new ResponseEntity<>(f1Schedule, HttpStatus.OK);
        } catch (Exception e) {
            log.error("SECURITY-EVENT: GET /get-f1-schedule failed for year={}: {}", year, e.getMessage());
            throw e;
        }
    }
}
