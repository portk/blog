package com.example.blog.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubjectMapper {
    public List<Map<String,Object>> select();
    public List<Map<String,Object>> selectById(String id);
    public List<Map<String,Object>> selectByWriter(String writer);
    public List<Map<String,Object>> selectByName(String name);
    public void insert(String writer, String name);
    public void update(String id, String name);
    public void delete(String id);
}
