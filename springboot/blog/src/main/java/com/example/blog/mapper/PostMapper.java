package com.example.blog.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {
    public List<Map<String,Object>> selectById(String id);
    public List<Map<String,Object>> selectByWriter(String userId);
    public List<Map<String,Object>> selectByBoard(String userId, String board);
    public List<Map<String,Object>> selectByTitle(String title);
    public List<Map<String,Object>> selectByContext(String context);
    public List<Map<String,Object>> selectPostId();
    public List<Map<String,Object>> selectPostAll(String userId);
    public List<Map<String,Object>> selectPostAllById(String id);
    public void insert(String board, String writer, String title, String context);
    public void update(String id, String board, String title, String context);
    public void delete(String id);
}
