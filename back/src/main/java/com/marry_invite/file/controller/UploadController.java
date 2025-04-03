package com.marry_invite.file.controller;

import com.marry_invite.file.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UploadController {
    private final UploadService uploadService;
    @PostMapping("/api/file")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = uploadService.uploadFile(file);
        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }
}
