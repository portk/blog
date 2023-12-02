package com.example.blog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.mapper.PostMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.POST)
public class PostController {
    @Autowired
    PostMapper postMapper;
    
    @PostMapping("/post/select/id")
    public List<Map<String,Object>> selectById(
        @RequestParam String id
    ){
        return postMapper.selectById(id);
    }
    @PostMapping("/{userId}/post/select")
    public List<Map<String,Object>> selectByWriter(
        @PathVariable String userId
    ){
        return postMapper.selectByWriter(userId);
    }
    @PostMapping("/{userId}/post/select/board")
    public List<Map<String,Object>> selectByBoard(
        @PathVariable String userId,
        @RequestParam String board
    ){
        return postMapper.selectByBoard(userId, board);
    }
    @PostMapping("/post/select/title")
    public List<Map<String,Object>> selectByTitle(
        @RequestParam String title
    ){
        title = "%"+title+"%";
        return postMapper.selectByTitle(title);
    }
    @PostMapping("/post/select/context")
    public List<Map<String,Object>> selectByContext(
        @RequestParam String context
    ){
        context = "%"+context+"%";
        return postMapper.selectByContext(context);
    }
    @PostMapping("/postid/select")
    public List<Map<String,Object>> selectPostId(){
        return postMapper.selectPostId();
    }
    @PostMapping("/{userId}/post/select/all")
    public List<Map<String,Object>> selectPostAll(
        @PathVariable String userId
    ){
        return postMapper.selectPostAll(userId);
    }
    @PostMapping("/post/select/all/id")
    public List<Map<String,Object>> selectPostAllById(
        @RequestParam String id
    ) {
        return postMapper.selectPostAllById(id);
    }

    @PostMapping("/post/insert")
    public String insert(
        @RequestParam String board,
        @RequestParam String writer,
        @RequestParam String title,
        @RequestParam String context
    ){
        postMapper.insert(board, writer, title, context);
        return "게시물이 업로드 되었습니다.";
    }

    @PostMapping("/post/update")
    public String update(
        @RequestParam String id,
        @RequestParam String board,
        @RequestParam String title,
        @RequestParam String context
    ){
        postMapper.update(id, board, title, context);
        return "게시물이 업데이트 되었습니다";
    }

    @PostMapping("/post/delete")
    public String delete(
        @RequestParam String id
    ){
        postMapper.delete(id);
        return "게시물이 삭제되었습니다.";
    }
}
