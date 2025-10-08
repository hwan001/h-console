package io.h001.hconsole.clusters.controller;

import lombok.RequiredArgsConstructor; 

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.h001.hconsole.clusters.services.ClusterService;

@RestController
@RequestMapping("/clusters")
@RequiredArgsConstructor
public class ClusterController {

    private final ClusterService clusterService;

    @GetMapping("/all")
    public String getClusters() {
        return clusterService.getAllClusters();
    }
}