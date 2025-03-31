package com.marry_invite.map.dto;

import lombok.Data;

@Data
public class MarkerResponse {
    private String roadAddress;
    private String jibunAddress;
    private String x;
    private String y;

    public MarkerResponse(String roadAddress, String jibunAddress, String x, String y) {
        this.roadAddress = roadAddress;
        this.jibunAddress = jibunAddress;
        this.x = x;
        this.y = y;
    }
}
