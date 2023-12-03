package com.example.blog.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
    public List<Map<String,Object>> selectByPost(String postId);
    public Map<String,Object> selectById(String fileId);
    public void insert(String uuid, String fileName, String postId, String writer, Long fileSize);
    public void delete(String fileId);
}
