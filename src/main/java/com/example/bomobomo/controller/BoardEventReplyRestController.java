package com.example.bomobomo.controller;

import com.example.bomobomo.domain.vo.Criteria;
import com.example.bomobomo.domain.vo.EventCommentVo;
import com.example.bomobomo.domain.vo.PageVo;
import com.example.bomobomo.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/eventReplies")
public class BoardEventReplyRestController {

    private final ReplyService replyService;

    //이벤트 서비스 리뷰
    //댓글등록
    @PostMapping("")
    public void eventReviewReply(@RequestBody EventCommentVo eventCommentVo){
        replyService.registerEventReply(eventCommentVo);
    }


    //이벤트 서비스 리뷰 댓글 리스트
    @GetMapping("/list/{eventBoardNumber}/{page}")
    public Map<String, Object> showEventReplyList(@PathVariable("eventBoardNumber") Long eventBoardNumber,
                                                  @PathVariable("page") int page){
        Criteria criteria = new Criteria();
        criteria.setAmount(6);
        criteria.setPage(page);

        PageVo pageReplyVo=new PageVo(replyService.getTotalEventReply(eventBoardNumber), criteria);
        List<EventCommentVo> replyList = replyService.findAllEventReply(eventBoardNumber, criteria);

        Map<String, Object> replyMap = new HashMap<>();
        replyMap.put("pageReplyVo", pageReplyVo);
        replyMap.put("replyList", replyList);
        replyMap.put("totalReply", replyService.getTotalEventReply(eventBoardNumber));


        log.info(replyList.toString()+"=======================**************");

        return replyMap;
    }

}
