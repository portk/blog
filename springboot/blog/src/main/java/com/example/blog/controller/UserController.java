package com.example.blog.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.blog.mapper.UserMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.POST)
public class UserController {
    @Autowired
    UserMapper userMapper;

    @PostMapping("/user/select")
    public List<Map<String,Object>> userSelect(){
        return userMapper.select();
    }
    @PostMapping("/user/select/code")
    public List<Map<String,Object>> userSelectByCode(
        @RequestParam String code
    ){
        return userMapper.selectByCode(code);
    }
    @PostMapping("/user/select/id")
    public List<Map<String,Object>> userSelectById(
        @RequestParam String id
    ){
        return userMapper.selectById(id);
    }

    @PostMapping("/user/search/id")
    public List<Map<String,Object>> userSearchById(
        @RequestParam String id
    ){
        id='%'+id+'%';
        return userMapper.selectById(id);
    }
    
    @PostMapping("/user/signin")
    public List<Map<String,Object>> userSearchByIdPw(
        @RequestParam String id,
        @RequestParam String pw
    ){
        List<Map<String,Object>> userData;
        userData = userMapper.selectByIdPw(id, pw);
        if (userData != null){
            return userData;
        } else{
            return null;
        }
    }

    @PostMapping("/user/insert")
    public String userInsert(
        @RequestParam String id,
        @RequestParam String pw,
        @RequestParam String nick,
        @RequestParam String email
    ){
        userMapper.insert(id,pw,nick,email);
        return "가입되었습니다.";
    }

    @PostMapping("/user/update")
    public String userUpdate(
        @RequestParam String code,
        @RequestParam String id,
        @RequestParam String pw,
        @RequestParam String nick,
        @RequestParam String email
    ){
        userMapper.update(code, id, pw, nick, email);
        return "계정 정보가 수정되었습니다.";
    }

    @PostMapping("/user/delete")
    public String userDelete(
        @RequestParam String code
    ){
        userMapper.delete(code);
        return "계정이 삭제되었습니다.";
    }
}
