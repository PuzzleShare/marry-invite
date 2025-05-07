package com.marry_invite.users.filter;

import com.marry_invite.users.dto.request.CustomRequestWrapper;
import com.marry_invite.users.provider.JWTProvider;
import com.marry_invite.users.service.CustomOAuth2UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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
        int accessState = jwtProvider.validateToken(accessToken);
        int refreshState = jwtProvider.validateToken(refreshToken);

        if ((accessState == 1 && refreshState == 0) || (accessState == 0 && refreshState == 1)){
            // access token expire and refresh token valid
            // or access token valid and refresh token expire
            accessToken = jwtProvider.createAccessToken(jwtProvider.getSubset(refreshToken));
            refreshToken = jwtProvider.createRefreshToken(jwtProvider.getSubset(accessToken));
            request = new CustomRequestWrapper(request, accessToken, refreshToken);

            customOAuth2UserService.setTokenCookies(response, accessToken, refreshToken);
        } else if (accessState == 1 && refreshState == 1) {
            customOAuth2UserService.removeTokenCookies(request, response);
        }

        filterChain.doFilter(request, response);
    }
}
