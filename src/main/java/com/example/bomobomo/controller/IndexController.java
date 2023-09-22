package com.example.bomobomo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/common/*")
public class IndexController {

//    화면 볼려고 만든 임시 컨트롤러
    @GetMapping("/index")
    public String showMainPage(){
        return "common/index";
    }
}
