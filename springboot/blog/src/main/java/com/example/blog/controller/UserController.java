package com.example.blog.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.mapper.UserMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class UserController {
    @Autowired
    UserMapper userMapper;

    @GetMapping("/user/select")
    public List<Map<String,Object>> userSelect(){
        return userMapper.select();
    }
    @GetMapping("/user/select/code")
    public List<Map<String,Object>> userSelectByCode(
        @RequestParam String code
    ){
        return userMapper.selectByCode(code);
    }
    @GetMapping("/user/select/id")
    public List<Map<String,Object>> userSelectById(
        @RequestParam String id
    ){
        id='%'+id+'%';
        return userMapper.selectById(id);
    }

    @GetMapping("/user/insert")
    public void userInsert(
        @RequestParam String id,
        @RequestParam String pw
    ){
        userMapper.insert(id,pw);
    }

    @GetMapping("/user/update")
    public void userUpdate(
        @RequestParam String code,
        @RequestParam String id,
        @RequestParam String pw
    ){
        userMapper.update(code, id, pw);
    }
    @GetMapping("/user/update/nick")
    public void userUpdateNick(
        @RequestParam String code,
        @RequestParam String nick
    ){
        userMapper.updateNickname(code, nick);
    }
    @GetMapping("/user/update/email")
    public void userUpdateEmail(
        @RequestParam String code,
        @RequestParam String email
    ){
        userMapper.updateEmail(code, email);
    }

    @GetMapping("/user/delete")
    public void userDelete(
        @RequestParam String code
    ){
        userMapper.delete(code);
    }
}
