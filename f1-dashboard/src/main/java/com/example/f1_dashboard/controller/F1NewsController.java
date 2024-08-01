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
@CrossOrigin(origins = {"http://localhost:3000"})
public class F1NewsController {
    private final F1NewsService f1NewsService;
    public F1NewsController(F1NewsService f1NewsService) {
        this.f1NewsService = f1NewsService;
    }

    @GetMapping("/get-f1-news/{limit}")
    public ResponseEntity<List<F1News>> getF1News(@PathVariable String limit){
        List<F1News> f1News = f1NewsService.getF1News(limit);
        return new ResponseEntity<>(f1News, HttpStatus.OK);
    }
}
