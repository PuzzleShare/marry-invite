package com.marry_invite.file.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.marry_invite.file.converter.WebpConverter;
import com.marry_invite.file.exception.ImageConvertException;
import com.marry_invite.file.provider.FileNameProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.*;

@Service
@RequiredArgsConstructor
public class UploadService {
    private final WebpConverter webpConverter;
    private final FileNameProvider fileNameProvider;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    public String uploadFile(MultipartFile multipartFile){
        String orgName = multipartFile.getOriginalFilename();
        String ext = orgName.substring(orgName.lastIndexOf('.')); // 확장자

        if (!webpConverter.isConvertable(ext)){
            throw new ImageConvertException("jpg, jpeg, png 파일만 업로드 가능합니다.");
        }

        // convert webp and save
        String fileName = fileNameProvider.yyyyMMddUuid();
        File file = webpConverter.convertToWebpWithLossless(fileName, multipartFile);

        // upload file to s3
        String saveFileName = fileName + ext;
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());
        metadata.setContentLength(file.length());
        try {
            amazonS3Client.putObject(bucket, saveFileName, new FileInputStream(file), metadata);
            return saveFileName;
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            file.delete();
        }
    }
}
