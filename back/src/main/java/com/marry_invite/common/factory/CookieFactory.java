package com.marry_invite.common.factory;

import org.springframework.http.ResponseCookie;

import java.time.Duration;

import static com.marry_invite.users.provider.JWTProvider.ACCESS_MAX_AGE;
import static com.marry_invite.users.provider.JWTProvider.REFRESH_MAX_AGE;

public class CookieFactory {
    public static ResponseCookie getAccessCookie(String accessToken){
        return ResponseCookie.from("accessToken", accessToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofSeconds(ACCESS_MAX_AGE))
                .sameSite("None")
                .build();
    }
    public static ResponseCookie getRefreshCookie(String refreshToken){
        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofSeconds(REFRESH_MAX_AGE))
                .sameSite("None")
                .build();
    }
}
