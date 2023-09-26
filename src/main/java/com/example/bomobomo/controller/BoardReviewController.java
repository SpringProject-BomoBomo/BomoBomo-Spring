package com.example.bomobomo.controller;


import com.example.bomobomo.domain.vo.Criteria;
import com.example.bomobomo.domain.vo.PageVo;
import com.example.bomobomo.domain.vo.SearchReviewVo;
import com.example.bomobomo.domain.vo.SitterBoardVo;
import com.example.bomobomo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/reviews")
public class BoardReviewController {
    private final ReviewService reviewService;

    //돌봄 서비스 후기 리스트
    @GetMapping("/service/{page}")
    public Map<String, Object> findListAll(@PathVariable("page") int page, SearchReviewVo searchReviewVo){

        Criteria criteria = new Criteria();
        criteria.setPage(page);
        //한 페이지당 게시물 수 설정
        criteria.setAmount(8);
        PageVo pageReviewVo = new PageVo(reviewService.getTotal(searchReviewVo), criteria);
        List<SitterBoardVo> serviceReviewList = reviewService.selectAll(criteria, searchReviewVo);

        Map<String, Object> reviewMap = new HashMap<>();
        reviewMap.put("pageReviewVo", pageReviewVo);
        reviewMap.put("serviceReviewList", serviceReviewList);

        log.info(pageReviewVo+"===============================");
        log.info(serviceReviewList+"=====================");

        return reviewMap;

    }

    //이벤트 서비스 후기 리스트
}
