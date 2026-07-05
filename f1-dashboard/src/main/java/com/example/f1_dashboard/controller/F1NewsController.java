package com.example.f1_dashboard.controller;

import com.example.f1_dashboard.f1news.F1News;
import com.example.f1_dashboard.service.F1NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = {"http://localhost:3000","https://quali.onrender.com"})
public class F1NewsController {
    private final F1NewsService f1NewsService;
    public F1NewsController(F1NewsService f1NewsService) {
        this.f1NewsService = f1NewsService;
    }

    private static final int LIMIT_MIN = 1;
    private static final int LIMIT_MAX = 100;

    @GetMapping("/get-f1-news/{limit}")
    public ResponseEntity<List<F1News>> getF1News(@PathVariable String limit){
        int limitValue;
        try {
            limitValue = Integer.parseInt(limit);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (limitValue < LIMIT_MIN || limitValue > LIMIT_MAX) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<F1News> f1News = f1NewsService.getF1News(String.valueOf(limitValue));
        return new ResponseEntity<>(f1News, HttpStatus.OK);
    }
}
