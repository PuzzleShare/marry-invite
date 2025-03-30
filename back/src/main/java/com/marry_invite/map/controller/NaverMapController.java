package com.marry_invite.map.controller;

import com.marry_invite.map.dto.MarkerResponse;
import com.marry_invite.map.service.NaverMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/map")
@RequiredArgsConstructor
public class NaverMapController {

    private final NaverMapService naverMapService;

    @GetMapping("/geocode")
    public ResponseEntity<Object> getCoordinates(@RequestParam("address") String address) {
        try {
            MarkerResponse response = naverMapService.getCoordinates(address);
            System.out.println(response);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
}
