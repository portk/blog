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
    @GetMapping("boardnsubject/select")
    public List<Map<String,Object>> selectBoardNSubject(){
        return boardMapper.selectBoardNSubject();
    }

    @GetMapping("/board/insert")
    public String insert(
        @RequestParam String subject,
        @RequestParam String writer,
        @RequestParam String name
    ){
        boardMapper.insert(subject, writer, name);
        return "게시판이 추가되었습니다.";
    }

    @GetMapping("/board/update")
    public String update(
        @RequestParam String id,
        @RequestParam String subject,
        @RequestParam String name
    ){
        boardMapper.update(id, subject, name);
        return "게시판 정보가 수정되었습니다.";
    }

    @GetMapping("/board/delete")
    public String delete(
        @RequestParam String id
    ){
        boardMapper.delete(id);
        return "게시판이 삭제되었습니다";
    }
}
