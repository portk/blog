package com.example.blog.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.mapper.BoardMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class BoardController {
    @Autowired
    BoardMapper boardMapper;
    
    @GetMapping("/board/select")
    public List<Map<String,Object>> select(){
        return boardMapper.select();
    }
    @GetMapping("/board/select/id")
    public List<Map<String,Object>> selectById(
        @RequestParam String id
    ){
        return boardMapper.selectById(id);
    }
    @GetMapping("/board/select/subject")
    public List<Map<String,Object>> selectBySubject(
        @RequestParam String subject
    ){
        return boardMapper.selectBySubject(subject);
    }
    @GetMapping("/board/select/writer")
    public List<Map<String,Object>> selectByWriter(
        @RequestParam String writer
    ){
        return boardMapper.selectByWriter(writer);
    }
    @GetMapping("/board/select/name")
    public List<Map<String,Object>> selectByName(
        @RequestParam String name
    ){
        name= '%'+name+'%';
        return boardMapper.selectByName(name);
    }

    @GetMapping("/board/insert")
    public void insert(
        @RequestParam String subject,
        @RequestParam String writer,
        @RequestParam String name
    ){
        boardMapper.insert(subject, writer, name);
    }

    @GetMapping("/board/update")
    public void update(
        @RequestParam String id,
        @RequestParam String subject,
        @RequestParam String name
    ){
        boardMapper.update(id, subject, name);
    }

    @GetMapping("/board/delete")
    public void delete(
        @RequestParam String id
    ){
        boardMapper.delete(id);
    }
}
