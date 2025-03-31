package com.marry_invite.file.controller;

import com.marry_invite.file.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class UploadController {
    private final UploadService uploadService;
    @PostMapping("/api/file")
    public String uploadFile(@RequestBody MultipartFile data){
        return uploadService.uploadFile(data);
    }
}
