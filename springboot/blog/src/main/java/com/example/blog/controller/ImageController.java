package com.example.blog.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ImageController {
    @GetMapping(value="/img/banner")
    public String getBanner() {
        return "<img src='banner.png'>";
    }
    
    @GetMapping(value="/img/icon")
    public String getIcon() {
        return "<img src='icon.png'>";
    }

    @GetMapping(value="/img/sideicon")
    public String getSideIcon() {
        return "<img src='sideicon.png'>";
    }
}
