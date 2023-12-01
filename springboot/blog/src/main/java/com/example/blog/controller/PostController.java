package com.example.blog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.mapper.PostMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class PostController {
    @Autowired
    PostMapper postMapper;
    
    @GetMapping("/post/select")
    public List<Map<String,Object>> select(){
        return postMapper.select();
    }
    @GetMapping("/post/select/id")
    public List<Map<String,Object>> selectById(
        @RequestParam String id
    ){
        return postMapper.selectById(id);
    }
    @GetMapping("/post/select/writer")
    public List<Map<String,Object>> selectByWriter(
        @RequestParam String writer
    ){
        return postMapper.selectByWriter(writer);
    }
    @GetMapping("/post/select/board")
    public List<Map<String,Object>> selectByBoard(
        @RequestParam String board
    ){
        return postMapper.selectByBoard(board);
    }
    @GetMapping("/post/select/title")
    public List<Map<String,Object>> selectByTitle(
        @RequestParam String title
    ){
        title = "%"+title+"%";
        return postMapper.selectByTitle(title);
    }
    @GetMapping("/post/select/context")
    public List<Map<String,Object>> selectByContext(
        @RequestParam String context
    ){
        context = "%"+context+"%";
        return postMapper.selectByContext(context);
    }
    @GetMapping("/postid/select")
    public List<Map<String,Object>> selectPostId(){
        return postMapper.selectPostId();
    }
    @GetMapping("/post/select/all")
    public List<Map<String,Object>> selectPostAll(){
        return postMapper.selectPostAll();
    }

    @GetMapping("/post/insert")
    public String insert(
        @RequestParam String board,
        @RequestParam String writer,
        @RequestParam String title,
        @RequestParam String context
    ){
        postMapper.insert(board, writer, title, context);
        return "게시물이 업로드 되었습니다.";
    }

    @GetMapping("/post/update")
    public String update(
        @RequestParam String id,
        @RequestParam String board,
        @RequestParam String title,
        @RequestParam String context
    ){
        postMapper.update(id, board, title, context);
        return "게시물이 업데이트 되었습니다";
    }

    @GetMapping("/post/delete")
    public String delete(
        @RequestParam String id
    ){
        postMapper.delete(id);
        return "게시물이 삭제되었습니다.";
    }
}
