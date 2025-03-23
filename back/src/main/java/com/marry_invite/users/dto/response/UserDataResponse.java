package com.marry_invite.users.dto.response;

import com.marry_invite.users.document.Users;

public record UserDataResponse(
        String userName,
        String image,
        String email,
        String provider
) {
    public static UserDataResponse of(Users users){
        return new UserDataResponse(
                users.getName(),
                users.getProfileImg(),
                users.getEmail(),
                users.getProvider()
        );
    }
}
