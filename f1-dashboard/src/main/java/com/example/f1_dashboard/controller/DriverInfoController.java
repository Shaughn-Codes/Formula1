package com.example.f1_dashboard.controller;


import com.example.f1_dashboard.driverinfo.DriverInfo;
import com.example.f1_dashboard.service.DriverInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","https://quali.onrender.com"})
public class DriverInfoController {
    private static final Logger log = LoggerFactory.getLogger(DriverInfoController.class);

    private final DriverInfoService driverInfoService;

    public  DriverInfoController(DriverInfoService driverInfoService){
        this.driverInfoService = driverInfoService;
    }

    @GetMapping("/get-driver-info/{driverID}")
    public ResponseEntity<DriverInfo> getDriverInfo(@PathVariable String driverID){
        log.info("SECURITY-EVENT: GET /get-driver-info called with driverID={}", driverID);
        try {
            DriverInfo driverInfo = driverInfoService.getDriverInfo(driverID);
            log.info("SECURITY-EVENT: GET /get-driver-info succeeded for driverID={}", driverID);
            return new ResponseEntity<>(driverInfo, HttpStatus.OK);
        } catch (Exception e) {
            log.error("SECURITY-EVENT: GET /get-driver-info failed for driverID={}: {}", driverID, e.getMessage());
            throw e;
        }
    }

}
