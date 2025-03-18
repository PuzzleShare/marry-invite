package com.marry_invite.users.filter;

import com.marry_invite.users.dto.request.CustomRequestWrapper;
import com.marry_invite.users.provider.JWTProvider;
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
public class TokenRefreshFilter extends OncePerRequestFilter {
    private final JWTProvider jwtProvider;
    private final CustomOAuth2UserService customOAuth2UserService;
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String accessToken = customOAuth2UserService.getCookie(request, "accessToken");
        String refreshToken = customOAuth2UserService.getCookie(request, "refreshToken");

        if (jwtProvider.validateToken(accessToken) == 1 && jwtProvider.validateToken(refreshToken) == 0){
            // access token expire and refresh token valid
            accessToken = jwtProvider.createAccessToken(jwtProvider.getSubset(refreshToken));
            request = new CustomRequestWrapper(request, accessToken);
            customOAuth2UserService.setTokenCookies(response, accessToken, refreshToken);

        } else if (jwtProvider.validateToken(accessToken) == 0 && jwtProvider.validateToken(refreshToken) == 1) {
            // access token valid and refresh token expire
            refreshToken = jwtProvider.createRefreshToken(jwtProvider.getSubset(accessToken));
            customOAuth2UserService.setTokenCookies(response, accessToken, refreshToken);
        }

        filterChain.doFilter(request, response);
    }
}
