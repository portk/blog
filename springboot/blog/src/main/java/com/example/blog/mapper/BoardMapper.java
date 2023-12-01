package com.example.blog.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    public List<Map<String,Object>> select();
    public List<Map<String,Object>> selectById(String id);
    public List<Map<String,Object>> selectBySubject(String subject);
    public List<Map<String,Object>> selectByWriter(String writer);
    public List<Map<String,Object>> selectByName(String name);
    public List<Map<String,Object>> selectBoardNSubject();
    public void insert(String subject, String writer, String name);
    public void update(String id, String subject, String name);
    public void delete(String id);
}
