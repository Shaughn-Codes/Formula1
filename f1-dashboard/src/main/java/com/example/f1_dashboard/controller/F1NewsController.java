package com.example.f1_dashboard.controller;

import com.example.f1_dashboard.f1news.F1News;
import com.example.f1_dashboard.service.F1NewsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class F1NewsController {
    private static final Logger log = LoggerFactory.getLogger(F1NewsController.class);

    private final F1NewsService f1NewsService;
    public F1NewsController(F1NewsService f1NewsService) {
        this.f1NewsService = f1NewsService;
    }

    private static final int LIMIT_MIN = 1;
    private static final int LIMIT_MAX = 100;

    @GetMapping("/get-f1-news/{limit}")
    public ResponseEntity<List<F1News>> getF1News(@PathVariable String limit){
        log.info("SECURITY-EVENT: GET /get-f1-news called with limit={}", limit);
        int limitValue;
        try {
            limitValue = Integer.parseInt(limit);
        } catch (NumberFormatException e) {
            log.warn("SECURITY-EVENT: GET /get-f1-news rejected — invalid limit value: {}", limit);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (limitValue < LIMIT_MIN || limitValue > LIMIT_MAX) {
            log.warn("SECURITY-EVENT: GET /get-f1-news rejected — limit={} out of allowed range [{},{}]",
                    limitValue, LIMIT_MIN, LIMIT_MAX);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            List<F1News> f1News = f1NewsService.getF1News(String.valueOf(limitValue));
            log.info("SECURITY-EVENT: GET /get-f1-news succeeded with limit={}", limitValue);
            return new ResponseEntity<>(f1News, HttpStatus.OK);
        } catch (Exception e) {
            log.error("SECURITY-EVENT: GET /get-f1-news failed with limit={}: {}", limitValue, e.getMessage());
            throw e;
        }
    }
}
