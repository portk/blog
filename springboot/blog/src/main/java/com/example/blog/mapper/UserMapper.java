package com.example.blog.mapper;

import java.util.*;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public List<Map<String,Object>> select();
    public List<Map<String,Object>> selectByCode(String code);
    public List<Map<String,Object>> selectById(String id);
    public List<Map<String,Object>> selectByIdPw(String id, String pw);
    public void insert(String id, String pw, String nick, String email);
    public void update(String code, String id, String pw, String nick, String email);
    public void delete(String code);
}
