package com.marry_invite.users.handler;

import com.marry_invite.users.document.Users;
import com.marry_invite.users.dto.response.UserDataResponse;
import com.marry_invite.users.enums.OAuth2Type;
import com.marry_invite.users.provider.JWTProvider;
import com.marry_invite.users.repository.UsersRepository;
import com.marry_invite.users.service.CustomOAuth2UserService;
import com.nimbusds.common.contenttype.ContentType;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.marry_invite.users.provider.JWTProvider.ACCESS_MAX_AGE;
import static com.marry_invite.users.provider.JWTProvider.REFRESH_MAX_AGE;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationsSuccessHandler implements AuthenticationSuccessHandler {
    private final UsersRepository usersRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JWTProvider jwtProvider;
    @Value("${login.redirect-url}")
    private String redirectUrl;
    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        String uri = request.getRequestURI();
        String providerType = uri.substring(uri.lastIndexOf('/') + 1).toUpperCase();
        UserDataResponse userData = OAuth2Type.valueOf(providerType).convert(oAuth2User.getAttributes());

        Users users = usersRepository.getUsersByEmailAndProvider(userData.email(), userData.provider())
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));

        String accessToken = jwtProvider.createAccessToken(users);
        String refreshToken = jwtProvider.createRefreshToken(users);

        response.setContentType(ContentType.APPLICATION_JSON.getType());
        response.setCharacterEncoding("UTF-8");
//        response.addHeader("Authorization", "Bearer " + accessToken);
        customOAuth2UserService.setTokenCookies(response, accessToken, refreshToken);
//        response.addHeader(
//                "Set-Cookie",
//                "accessToken=" + accessToken +
//                        "; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=" + ACCESS_MAX_AGE);
//        response.addHeader(
//                "Set-Cookie",
//                "refreshToken=" + refreshToken +
//                        "; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=" + REFRESH_MAX_AGE);
        response.sendRedirect(redirectUrl);
    }
}
