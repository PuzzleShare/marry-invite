package com.marry_invite.file.provider;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class FileNameProvider {
    private final DateTimeFormatter yyyyMMddFormat = DateTimeFormatter.ofPattern("YYYY/MM/dd");

    public String yyyyMMddUuid(){
        return LocalDate.now().format(yyyyMMddFormat) + '/' + UUID.randomUUID();
    }
}
