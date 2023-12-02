package com.example.blog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.mapper.ReplyMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.POST)
public class ReplyController {
    @Autowired
    ReplyMapper replyMapper;

    @PostMapping("/reply/select/sub")
    public List<Map<String, Object>> selectBySubId(
        @RequestParam String sub
    ){
        return replyMapper.selectBySubId(sub);
    }
    @PostMapping("/reply/select/post")
    public List<Map<String, Object>> selectByPost(
        @RequestParam String post
    ){
        return replyMapper.selectByPost(post);
    }
    @PostMapping("/reply/select/writer")
    public List<Map<String, Object>> selectByWriter(
        @RequestParam String writer
    ){
        return replyMapper.selectByWriter(writer);
    }
    @PostMapping("/reply/insert")
    public void insert(
        @RequestParam String post,
        @RequestParam String writer,
        @RequestParam String context
        ){
            replyMapper.insert(post, writer, context);
        }
    @PostMapping("/reply/insertsub")
    public void insertSub(
        @RequestParam String post,
        @RequestParam String writer,
        @RequestParam String context,
        @RequestParam String sub_id
        ){
            replyMapper.insertSub(post, writer, context, sub_id);
        }
    @PostMapping("/reply/update")
    public void update(
        @RequestParam String id,
        @RequestParam String context
        ){
            replyMapper.update(id, context);
        }
    @PostMapping("/reply/delete")
    public void delete(
        @RequestParam String id
        ){
            replyMapper.delete(id);
        }
}
