package com.example.blog.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.mapper.SubjectMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class SubjectController {
    @Autowired
    SubjectMapper subjectMapper;

    @GetMapping("/subject/select")
    public List<Map<String,Object>> select(){
        return subjectMapper.select();
    }
    @GetMapping("/subject/select/id")
    public List<Map<String,Object>> selectById(
        @RequestParam String id
    ){
        return subjectMapper.selectById(id);
    }
    @GetMapping("/subject/select/writer")
    public List<Map<String,Object>> selectByWriter(
        @RequestParam String writer
    ){
        return subjectMapper.selectByWriter(writer);
    }
    @GetMapping("/subject/select/name")
    public List<Map<String,Object>> selectByName(
        @RequestParam String name
    ){
        name = '%'+name+'%';
        return subjectMapper.selectByName(name);
    }

    @GetMapping("/subject/insert")
    public String insert(
        @RequestParam String writer,
        @RequestParam String name
    ){
        subjectMapper.insert(writer, name);
        return "입력되었습니다.";
    }

    @GetMapping("/subject/update")
    public String update(
        @RequestParam String id,
        @RequestParam String name
    ){
        subjectMapper.update(id, name);
        return "수정되었습니다.";
    }

    @GetMapping("/subject/delete")
    public String delete(
        @RequestParam String id
    ){
        subjectMapper.delete(id);
        return "삭제되었습니다.";
    }
}
