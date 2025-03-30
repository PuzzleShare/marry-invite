package com.marry_invite.provider;

import com.marry_invite.file.provider.FileNameProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FileNameProviderTest {
    @Autowired
    private FileNameProvider fileNameProvider;

    @Test
    @DisplayName("file name create test yyyyMMddUUID")
    public void fileNameYyyyMMddUUID(){
        String fileName = fileNameProvider.yyyyMMddUuid();
        System.out.println(fileName);
    }
}
