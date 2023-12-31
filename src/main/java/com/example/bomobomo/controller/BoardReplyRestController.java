package com.example.bomobomo.controller;

import com.example.bomobomo.domain.dto.SitterCommentDto;
import com.example.bomobomo.domain.vo.*;
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
@RequestMapping("/replies")
public class BoardReplyRestController {


    private final ReplyService replyService;

    //돌봄 서비스 리뷰
    //댓글 등록
    @PostMapping("")
    public void serviceReviewReply(@RequestBody SitterCommentDto sitterCommentDto){
        replyService.register(sitterCommentDto);

    }
    

    //댓글 리스트 조회
    @GetMapping("/list/{sitterBoardNumber}")
    public List<SitterCommentVo> showReply(@PathVariable("sitterBoardNumber") Long sitterBoardNumber){
        return replyService.find(sitterBoardNumber);
    }

    
    //댓글리스트 조회(페이징 포함)
    @GetMapping("/list/{sitterBoardNumber}/{page}")
    public Map<String, Object> showReplyList(@PathVariable("sitterBoardNumber") Long sitterBoardNumber,
                                           @PathVariable("page") int page){

        Criteria criteria = new Criteria();
        criteria.setAmount(6);
        criteria.setPage(page);

        PageVo pageReplyVo = new PageVo(replyService.getTotal(sitterBoardNumber), criteria);
        List<SitterCommentVo> replyList = replyService.findAll(sitterBoardNumber, criteria);

        Map<String, Object> replyMap = new HashMap<>();
        replyMap.put("pageReplyVo", pageReplyVo);
        replyMap.put("replyList", replyList);
        replyMap.put("totalReply", replyService.getTotal(sitterBoardNumber));

        return replyMap;

    }


    //댓글수정
    @PatchMapping("{sitterCommentNumber}")
    public void modifyReply(@PathVariable("sitterCommentNumber") Long sitterCommentNumber,
                            @RequestBody SitterCommentDto sitterCommentDto){
        sitterCommentDto.setSitterCommentNumber(sitterCommentNumber);
        replyService.modify(sitterCommentDto);
    }

    //댓글삭제
    @DeleteMapping("/{sitterCommentNumber}")
    public void removeReply(@PathVariable("sitterCommentNumber") Long sitterCommentNumber){
        if (sitterCommentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }

        replyService.remove(sitterCommentNumber);
    }


    
    


}
