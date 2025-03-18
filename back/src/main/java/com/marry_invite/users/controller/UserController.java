package com.marry_invite.users.controller;

import com.marry_invite.users.dto.response.UserDataResponse;
import com.marry_invite.users.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/api/login")
    public UserDataResponse login(HttpServletRequest request, HttpServletResponse response){
        return userService.login(request, response);
    }
}
