package com.marry_invite.users.dto.request;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import static com.marry_invite.users.provider.JWTProvider.ACCESS_MAX_AGE;
import static com.marry_invite.users.provider.JWTProvider.REFRESH_MAX_AGE;


public class CustomRequestWrapper extends HttpServletRequestWrapper {
    private final Map<String, String> customHeaders = new HashMap<>();
    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request The request to wrap
     * @throws IllegalArgumentException if the request is null
     */
    public CustomRequestWrapper(HttpServletRequest request) {
        super(request);
    }
    public CustomRequestWrapper(HttpServletRequest request, String accessToken, String refreshToken) {
        super(request);
        customHeaders.put("Authorization", "Bearer " + accessToken);
    }
    @Override
    public String getHeader(String name) {
        return customHeaders.getOrDefault(name, super.getHeader(name));
    }

    @Override
    public Enumeration<String> getHeaderNames() {
        return Collections.enumeration(customHeaders.keySet());
    }
}
