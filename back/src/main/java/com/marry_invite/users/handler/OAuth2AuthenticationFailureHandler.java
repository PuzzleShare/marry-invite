package com.marry_invite.users.handler;

import com.marry_invite.common.dto.response.ErrorResponse;
import com.nimbusds.common.contenttype.ContentType;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException e
    ) throws IOException, ServletException {
        response.setContentType(ContentType.APPLICATION_JSON.toString());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(new ErrorResponse(e.getMessage()).toString());
    }
}
