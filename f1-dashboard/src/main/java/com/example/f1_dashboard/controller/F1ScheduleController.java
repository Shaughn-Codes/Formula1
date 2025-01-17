package com.example.f1_dashboard.controller;

import com.example.f1_dashboard.f1schedule.F1Schedule;
import com.example.f1_dashboard.service.F1ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","https://quali.onrender.com"})
public class F1ScheduleController {
    private final F1ScheduleService f1ScheduleService;
    public F1ScheduleController(F1ScheduleService f1ScheduleService){
        this.f1ScheduleService = f1ScheduleService;
    }
    @GetMapping("/get-f1-schedule/{year}")
    public ResponseEntity<Map<String, List<F1Schedule>>> getF1Schedule(@PathVariable String year){
        Map<String,List<F1Schedule>> f1Schedule = f1ScheduleService.getF1Schedule(year);
        return new ResponseEntity<>(f1Schedule, HttpStatus.OK);
    }
}
