package com.example.f1_dashboard.impl;

import com.example.f1_dashboard.client.F1ApiClient;
import com.example.f1_dashboard.f1news.F1News;
import com.example.f1_dashboard.service.F1NewsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class F1NewsImpl implements F1NewsService {
    private final F1ApiClient f1ApiClient;

    public F1NewsImpl(F1ApiClient f1ApiClient) {
        this.f1ApiClient = f1ApiClient;
    }

    @Override
    public List<F1News> getF1News(String limit) {
        F1News[] news = f1ApiClient.get("/news", Map.of("limit", limit), F1News[].class);
        return List.of(news);
    }
}
