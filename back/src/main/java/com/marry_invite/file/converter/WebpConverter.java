package com.marry_invite.file.converter;

import com.marry_invite.file.exception.ImageConvertException;
import com.sksamuel.scrimage.ImmutableImage;
import com.sksamuel.scrimage.webp.WebpWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

@Component
public class WebpConverter {
    @Value("${spring.profiles.active}")
    private String active;
    private Set<String> convertableExt = Set.of(".jpg",".jpeg",".png");
    public boolean isConvertable(String ext){
        return convertableExt.contains(ext);
    }
    /**
     * 손실 압축
     * @param fileName
     * @param originalFile
     * @return
     */
    public File convertToWebp(String fileName, MultipartFile originalFile) {
        try {
            File file = new File(originalFile.getOriginalFilename());
            originalFile.transferTo(file);
            return ImmutableImage.loader()// 라이브러리 객체 생성
                    .fromFile(file) // .jpg or .png File 가져옴
                    .output(WebpWriter.DEFAULT, new File(fileName + ".webp")); // 손실 압축 설정, fileName.webp로 파일 생성
        } catch (Exception e) {
            throw new ImageConvertException();
        }
    }

    /**
     * 무손실 압축
     * @param fileName
     * @param originalFile
     * @return
     */
    public File convertToWebpWithLossless(String fileName, MultipartFile originalFile) {
        String tempFileName = fileName + ".webp";
        if (active.equals("local")) {
            tempFileName = "D:\\" + tempFileName;
        }
        try {
            Path path = Paths.get(tempFileName);
            Files.createDirectories(path.getParent());
            path.toFile().createNewFile();
            return ImmutableImage.loader()// 라이브러리 객체 생성
                    .fromStream(originalFile.getInputStream()) // .jpg or .png File 가져옴
                    .output(WebpWriter.DEFAULT.withLossless(), tempFileName).toFile(); // 무손실 압축 설정, fileName.webp로 파일 생성
        } catch (Exception e) {
            throw new ImageConvertException();
        }
    }
}
