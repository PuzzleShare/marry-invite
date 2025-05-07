package com.marry_invite.users.service;

import com.marry_invite.users.document.Users;
import com.marry_invite.users.dto.response.UserDataResponse;
import com.marry_invite.users.enums.OAuth2Type;
import com.marry_invite.users.repository.UsersRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.marry_invite.common.factory.CookieFactory.getAccessCookie;
import static com.marry_invite.common.factory.CookieFactory.getRefreshCookie;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UsersRepository usersRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String oAuthType = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        try {
            UserDataResponse userData = OAuth2Type.valueOf(oAuthType).convert(oAuth2User.getAttributes());
            Optional<Users> optional = usersRepository.getUsersByEmailAndProvider(userData.email(), userData.provider());
            optional.ifPresentOrElse(
                    users -> {
                        users.setProfileImg(userData.image());
                        users.setName(userData.userName());
                    },
                    () -> {
                        Users users = Users.builder()
                                .name(userData.userName())
                                .profileImg(userData.image())
                                .email(userData.email())
                                .provider(userData.provider())
                                .build();
                        usersRepository.save(users);
                    }
            );
        } catch (IllegalArgumentException e) {
            throw new OAuth2AuthenticationException("unsupported provider");
        }
        return oAuth2User;
    }

    public String getCookie(HttpServletRequest request, String name){
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;

        for (Cookie cookie : cookies){
            if (cookie.getName().equals(name)){
                return cookie.getValue();
            }
        }
        return null;
    }

    public void setTokenCookies(
        HttpServletResponse response,
        String accessToken,
        String refreshToken
    ){
        response.addHeader(HttpHeaders.SET_COOKIE, getAccessCookie(accessToken).toString());
        response.addHeader(HttpHeaders.SET_COOKIE, getRefreshCookie(refreshToken).toString());
    }

    public void removeTokenCookies(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken") || cookie.getName().equals("refreshToken")) {
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }
}
