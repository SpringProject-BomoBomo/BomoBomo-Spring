package com.example.bomobomo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


//임시 컨트롤러
@Controller
@RequiredArgsConstructor
@RequestMapping("/board/*")
public class BoardController {



    @GetMapping("/faq")
    public String showFaqPage(){
        return "board/boardFaq";
    }


    @GetMapping("/notice")
    public String showNoticePage(){
        return "board/boardNotice";
    }


    @GetMapping("/serviceReview")
    public String showServiceReviewPage(){
        return "board/boardServiceReview";
    }
}
