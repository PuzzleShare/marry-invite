package com.marry_invite.users.service;

import com.marry_invite.users.document.Users;
import com.marry_invite.users.dto.response.UserDataResponse;
import com.marry_invite.users.provider.JWTProvider;
import com.marry_invite.users.repository.UsersRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UsersRepository usersRepository;
    private final JWTProvider jwtProvider;
    public UserDataResponse login(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = request.getHeader("Authorization").substring(7);
//        Cookie accessToken = Arrays.stream(request.getCookies())
//                .filter(cookie -> cookie.getName().equals("accessToken"))
//                .findFirst().get();

        String userId = jwtProvider.getSubset(accessToken);
        Users users = usersRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("유저를 찾을 수 없습니다."));
        return UserDataResponse.of(users);
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {

    }
}
