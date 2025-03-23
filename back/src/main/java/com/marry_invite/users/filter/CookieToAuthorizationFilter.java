package com.marry_invite.users.filter;

import com.marry_invite.users.dto.request.CustomRequestWrapper;
import com.marry_invite.users.service.CustomOAuth2UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Configuration
@RequiredArgsConstructor
public class CookieToAuthorizationFilter extends OncePerRequestFilter {
    private final CustomOAuth2UserService customOAuth2UserService;
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String accessToken = customOAuth2UserService.getCookie(request, "accessToken");

        if (accessToken != null) {
            request = new CustomRequestWrapper(request, accessToken);
        }

        filterChain.doFilter(request, response);
    }
}
