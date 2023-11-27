package com.example.blog.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReplyMapper {
    public List<Map<String, Object>> selectByPost(String post);
    public List<Map<String, Object>> selectBySubId(String sub);
    public List<Map<String, Object>> selectByWriter(String writer);
    public void insert(String post, String writer, String context);
    public void insertSub(String post, String writer, String context, String sub_id);
    public void update(String id, String context);
    public void delete(String id);
}
