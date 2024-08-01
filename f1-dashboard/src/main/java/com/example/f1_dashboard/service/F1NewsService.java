package com.example.f1_dashboard.service;

import com.example.f1_dashboard.f1news.F1News;

import java.util.List;

public interface F1NewsService {
    List<F1News> getF1News(String limit);
}
