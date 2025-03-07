package com.marry_invite.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/test")
public class TestController {
    @GetMapping("/ping")
    public String pingpong(){
        return "pong";
    }
}
