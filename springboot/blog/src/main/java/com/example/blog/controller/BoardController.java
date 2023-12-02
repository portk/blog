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

import com.example.blog.mapper.BoardMapper;

@RestController
@CrossOrigin(origins = "*", methods = RequestMethod.POST)
public class BoardController {
    @Autowired
    BoardMapper boardMapper;
    
    @PostMapping("/{userId}/board/select/subject")
    public List<Map<String,Object>> selectBySubject(
        @PathVariable String userId,
        @RequestParam String subject
    ){
        return boardMapper.selectBySubject(userId, subject);
    }
    @PostMapping("/{userId}/board/select")
    public List<Map<String,Object>> selectByWriter(
        @PathVariable String userId
    ){
        return boardMapper.selectByWriter(userId);
    }
    @PostMapping("/board/select/name")
    public List<Map<String,Object>> selectByName(
        @RequestParam String name
    ){
        name= '%'+name+'%';
        return boardMapper.selectByName(name);
    }
    @PostMapping("/{userId}/boardnsubject/select")
    public List<Map<String,Object>> selectBoardNSubject(
        @PathVariable String userId
    ){
        return boardMapper.selectBoardNSubject(userId);
    }

    @PostMapping("/board/insert")
    public String insert(
        @RequestParam String subject,
        @RequestParam String writer,
        @RequestParam String name
    ){
        boardMapper.insert(subject, writer, name);
        return "게시판이 추가되었습니다.";
    }

    @PostMapping("/board/update")
    public String update(
        @RequestParam String id,
        @RequestParam String subject,
        @RequestParam String name
    ){
        boardMapper.update(id, subject, name);
        return "게시판 정보가 수정되었습니다.";
    }

    @PostMapping("/board/delete")
    public String delete(
        @RequestParam String id
    ){
        boardMapper.delete(id);
        return "게시판이 삭제되었습니다";
    }
}
