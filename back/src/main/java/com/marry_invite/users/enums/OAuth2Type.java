package com.marry_invite.users.enums;

import com.marry_invite.users.dto.response.UserDataResponse;

import java.util.Map;
import java.util.function.Function;

public enum OAuth2Type {
    NAVER((data) -> {
        data = (Map<String, Object>)data.get("response");
        return new UserDataResponse(
                data.get("nickname").toString(),
                data.get("profile_image").toString(),
                data.get("email").toString(),
                "NAVER"
        );
    }),
    KAKAO((data)->{
        Map<String, Object> properties = (Map<String, Object>)data.get("properties");
        Map<String, Object> account = (Map<String, Object>)data.get("kakao_account");
        return new UserDataResponse(
                properties.get("nickname").toString(),
                properties.get("thumbnail_image").toString(),
                account.get("email").toString(),
                "KAKAO"
        );
    }),
    GOOGLE((data)-> new UserDataResponse(
            data.get("name").toString(),
            data.get("picture").toString(),
            data.get("email").toString(),
            "GOOGLE"
    ));
    private OAuth2Type(Function<Map<String, Object>, UserDataResponse> func){
        this.func = func;
    }
    private Function<Map<String, Object>, UserDataResponse> func;
    public UserDataResponse convert(Map<String, Object> attribute){
        return func.apply(attribute);
    }
}
