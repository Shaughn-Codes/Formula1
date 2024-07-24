package com.example.f1_dashboard.controller;


import com.example.f1_dashboard.driverinfo.DriverInfo;
import com.example.f1_dashboard.service.DriverInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class DriverInfoController {
    private final DriverInfoService driverInfoService;

    public  DriverInfoController(DriverInfoService driverInfoService){
        this.driverInfoService = driverInfoService;
    }

    @GetMapping("/get-driver-info/{driverID}")
    public ResponseEntity<DriverInfo> getDriverInfo(@PathVariable String driverID){
        DriverInfo driverInfo = driverInfoService.getDriverInfo(driverID);
        return new ResponseEntity<>(driverInfo, HttpStatus.OK);
    }

}
