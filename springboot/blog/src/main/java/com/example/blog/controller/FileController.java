package com.example.blog.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.blog.mapper.FileMapper;

@Controller
@CrossOrigin(origins = "*", methods = RequestMethod.POST)
public class FileController {
    @Autowired
    FileMapper fileMapper;

    
    @PostMapping("/file/insert")
    @ResponseBody
    public String upload(
        @RequestParam("file") MultipartFile[] mFiles,
        @RequestParam("writer") String writer,
        @RequestParam("post_id") String postId
    ){
        String directory = "C:/files/";
        for(MultipartFile mFile : mFiles){
            if (!mFile.isEmpty()){
                String uuid = UUID.randomUUID().toString();
                String fileName = mFile.getOriginalFilename();
                long fileSize = mFile.getSize();
                File file = new File(directory+uuid);
                try {
                    fileMapper.insert(uuid, fileName, postId, writer, fileSize);
                    mFile.transferTo(file);
                } catch (IllegalStateException|IOException e) {
                    e.printStackTrace();
                }
            }else {
            }
        }
        return "파일이 업로드가 종료되었습니다.";
    }

    @GetMapping("/file/download")
    @CrossOrigin(origins = "*", methods = RequestMethod.GET)
    public ResponseEntity<Resource> download(
        @RequestParam("fileId") String fileId
    ) throws Exception{
        Map<String,Object> target = fileMapper.selectById(fileId);
        String fileUUID = target.get("uuid").toString();
        String fileName = target.get("file_name").toString();
        File file = new File("C:/files/"+fileUUID);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
            .header("content-disposition",
            "filename=" + URLEncoder.encode(fileName, "utf-8"))
            .contentLength(file.length())
            .contentType(MediaType.parseMediaType("application/octet-stream"))
            .body(resource);
    }

    @PostMapping("/file/select/post")
    @ResponseBody
    public List<Map<String,Object>> selectByPost(
        @RequestParam("post_id") String postId
    ) {
        return fileMapper.selectByPost(postId);
    }

    @PostMapping("/file/delete")
    public String deleteFile(
        @RequestParam("fileId") String fileId
    ){
        Map<String,Object> fileData = fileMapper.selectById(fileId);
        String directory = "C:/files/";
        File file = new File(directory+fileData.get("uuid").toString());
        if (file.exists()){
            try {
                file.delete();
                fileMapper.delete(fileId);
                return "파일이 성공적으로 삭제되었습니다.";
            } catch (Exception e) {
                e.printStackTrace();
                return "파일 삭제를 실패하였습니다";
            }
        } else{
            return "파일이 존재하지 않습니다";
        }
    }
}
