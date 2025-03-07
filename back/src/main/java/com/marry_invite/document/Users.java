package com.marry_invite.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("users")
public class Users {
    @Id
    private String id;
    private String email;
    private String name;
    private String profilImg;
    private String provider;
}
