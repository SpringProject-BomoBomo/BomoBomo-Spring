package com.example.bomobomo.controller;

import com.example.bomobomo.domain.dto.EventBoardDto;
import com.example.bomobomo.domain.dto.SitterBoardDto;
import com.example.bomobomo.domain.vo.EventBoardVo;
import com.example.bomobomo.domain.vo.SitterBoardVo;
import com.example.bomobomo.service.NoticeService;
import com.example.bomobomo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.http.HttpResponse;
import java.util.*;
import java.util.stream.Collectors;


@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board/*")
public class BoardController {


    private final NoticeService noticeService;
    private final ReviewService reviewService;



    //FAQ 게시판
    @GetMapping("/faq")
    public String showFaqPage(){
        return "board/boardFaq";
    }

    //공지사항 게시판
    @GetMapping("/notice")
    public String showNoticePage(){
        return "board/boardNotice";
    }


    //공지사항 상세보기
    @GetMapping("/detail")
    public String showNoticeDetailPage(@RequestParam(name = "noticeNumber") Long noticeNumber, Model model, HttpServletRequest req, HttpServletResponse resp){


        //모델 객체를 통해 detail페이지로 해당 공지사항 세부내역 전달
        model.addAttribute("noticeDetail",  noticeService.selectOne(noticeNumber));

        //쿠키를 활용
        Cookie[] cookies = req.getCookies();
        boolean updateCount = true;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("notice_count_cookie".equals(cookie.getName())) {
                    // 해당 쿠키가 이미 존재하는 경우

                    String cookieValue = cookie.getValue();

                    //쿠키밸루를 가져와서 _마다 쪼개어 배열로 저장한다.
                    String[] values = cookieValue.split("_");
                    String boardNoticeNumber = values[0];

                    log.info(cookieValue+"=====================================================");
                    log.info(values[0]+"=====================================================");
                    log.info(values[1]+"=====================================================");

                    long storedTimestamp = Long.parseLong(values[1]); //쿠키를 생성했을 때 발급해준 발급시간을 저장
                    long currentTimestamp = new Date().getTime(); // 현재 시간을 저장

                    // 현재 날짜와 저장된 날짜를 비교하여 하루에 한 번만 업데이트
                    if (boardNoticeNumber.equals(req.getParameter("noticeNumber")) && (currentTimestamp - storedTimestamp) < (24 * 60 * 60 * 1000)) {

                        //조회수 증가x
                        updateCount = false;
                        break;
                    }
                }
            }
        }

        //쿠키가 없다면(또는 이미 발급 받았던 notice_count_cookie의 지속시간이 지났을 경우)
        // notice_count_cookie를 생성해주고 해당 게시물 들어갔을 때 조회수 증가
        if (updateCount) {
            Cookie newCookie = new Cookie("notice_count_cookie", req.getParameter("noticeNumber") + "_" + new Date().getTime());
            newCookie.setMaxAge(24 * 60 * 60); // 쿠키 생성 시 24시간 유지
            resp.addCookie(newCookie);

            //조회수 증가
            noticeService.updateCount(noticeNumber);
        }


        return "board/detail";
    }


    //=========================================================
    //돌봄후기 게시판


    @GetMapping("/serviceReview")
    public String showServiceReviewPage(){
        return "board/serviceReview";
    }

    
    
    //돌봄후기 등록 
    

    //돌봄후기 상세보기
    @GetMapping("/reviewDetail")
    public String showServiceReviewDetailPage(@RequestParam("sitterBoardNumber") Long sitterBoardNumber,
                                               Model model, HttpServletRequest req, HttpServletResponse resp){



        SitterBoardVo sitterBoardVo = reviewService.selectOne(sitterBoardNumber);
        List<SitterBoardVo> sitterBoardVoList = reviewService.findReviewDetail(sitterBoardVo.getEmpNumber());
        double getAvg = reviewService.getAvgRating(sitterBoardVo.getEmpNumber());


        Cookie[] cookies = req.getCookies();
        boolean updateCount = true;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("reviewDetail_count_cookie".equals(cookie.getName())) {
                    String cookieValue = cookie.getValue();

                    String[] values = cookieValue.split("/");
                    log.info("%%%%%%%%%% {}", Arrays.toString(values));

                    List<Long> valueList = Arrays.stream(values).mapToLong(Long::parseLong).boxed().collect(Collectors.toList());

                    if(valueList.contains(sitterBoardNumber)){
                        updateCount = false;
                        break;
                    }

                    valueList.add(sitterBoardNumber);
                    log.info("##############3 {}", valueList);

                    String result = String.join("/", valueList.stream().map(ele -> ele+"").collect(Collectors.toList()));

                    log.info("**************************** {}", result);
                    cookie.setValue(result);
                    resp.addCookie(cookie);
                    updateCount = false;
                    reviewService.updateCount(sitterBoardNumber);

                }

            }
        }

        if (updateCount) {
            Cookie newCookie = new Cookie("reviewDetail_count_cookie", req.getParameter("sitterBoardNumber"));
            newCookie.setMaxAge(24 * 60 * 60);
            resp.addCookie(newCookie);

            reviewService.updateCount(sitterBoardNumber);
        }


        model.addAttribute("sitterReviewList", sitterBoardVoList);
        model.addAttribute("serviceReviewDetail", sitterBoardVo);
        model.addAttribute("getAvg", (Math.round(getAvg*100) / 100.0));

        log.info(String.valueOf(getAvg));
        log.info(sitterBoardVo.toString());
        log.info(sitterBoardVoList.toString());
        return "board/serviceReviewDetail";
    }
    //돌봄 후기 수정창으로 이동
    @GetMapping("/modifyServiceReview")
    public String modifyServiceReview(@ModelAttribute("sitterBoardNumber") Long sitterBoardNumber,
                                      Model model){


        model.addAttribute("sitter",  reviewService.selectOne(sitterBoardNumber));
        return "board/serviceReviewModify";
    }

    //돌봄 후기 수정 완료
    @PostMapping("/modifySR")
    public RedirectView modifySR(SitterBoardDto sitterBoardDto,
                                 @RequestParam("sitterBoardNumber") Long sitterBoardNumber,
                                 RedirectAttributes redirectAttributes)
        {

        sitterBoardDto.setSitterBoardNumber(sitterBoardNumber);
        log.info(sitterBoardDto.toString()+"*******************===========================");
        reviewService.modifyServiceReview(sitterBoardDto);

            redirectAttributes.addAttribute("sitterBoardNumber", sitterBoardDto.getSitterBoardNumber());

            return new RedirectView("/board/reviewDetail");
    }



    //돌봄후기 삭제
    @GetMapping("/removeSReview")
    public RedirectView removeServiceReview(Long sitterBoardNumber){
        reviewService.delete(sitterBoardNumber);

        return new RedirectView("serviceReview");
    }

    
    //=========================================================================
    //이벤트 게시판 이동
    @GetMapping("/eventReview")
    public String showEventReviewPage(){
        return "board/eventReview";
    }


    //이벤트 후기 등록
    
    
    
    //이벤트 후기 상세보기
    @GetMapping("/reviewEventDetail")
    public String showEventReviewDetailPage(@RequestParam("eventBoardNumber")Long eventBoardNumber
            , Model model, HttpServletRequest req, HttpServletResponse resp){



        EventBoardVo eventBoardVo = reviewService.showEReviewDetail(eventBoardNumber);
        List<EventBoardVo> eventBoardVoList = reviewService.findEventReviewTopCount(eventBoardVo.getEventNumber());
        double getAvgEventReview = reviewService.getAvgEventReviewRating(eventBoardVo.getEventNumber());

        log.info(String.valueOf(getAvgEventReview) +"===============================================");
        log.info(eventBoardVo.toString()+"====================******************");

        model.addAttribute("eventReviewList", eventBoardVoList);
        model.addAttribute("eventReviewDetail", eventBoardVo);
        model.addAttribute("avgEventReview", (Math.round(getAvgEventReview*100) / 100.0));



        Cookie[] cookies = req.getCookies();
        boolean updateCount = true;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("eventReviewDetail_count_cookie".equals(cookie.getName())) {
                    String cookieValue = cookie.getValue();

                    String[] values = cookieValue.split("/");
                    log.info("%%%%%%%%%% {}", Arrays.toString(values));

                    List<Long> valueList = Arrays.stream(values).mapToLong(Long::parseLong).boxed().collect(Collectors.toList());

                    if(valueList.contains(eventBoardNumber)){
                        updateCount = false;
                        break;
                    }

                    valueList.add(eventBoardNumber);
                    log.info("##############3 {}", valueList);

                    String result = String.join("/", valueList.stream().map(ele -> ele+"").collect(Collectors.toList()));

                    log.info("**************************** {}", result);
                    cookie.setValue(result);
                    resp.addCookie(cookie);
                    updateCount = false;
                    reviewService.updateEventReviewCount(eventBoardNumber);

                }

            }
        }

        if (updateCount) {
            Cookie newCookie = new Cookie("eventReviewDetail_count_cookie", req.getParameter("eventBoardNumber"));
            newCookie.setMaxAge(24 * 60 * 60);
            resp.addCookie(newCookie);

            reviewService.updateEventReviewCount(eventBoardNumber);
        }
        return "board/eventReviewDetail";

    }
    //이벤트 후기 수정 페이지 이동
    @GetMapping("/modifyEventReview")
    public String modifyEventReview(@ModelAttribute("eventBoardNumber") Long eventBoardNumber,
                                    Model model){

        model.addAttribute("eventReview", reviewService.showEReviewDetail(eventBoardNumber));
        return "/board/eventReviewModify";
    }


    //이벤트 후기 수정 등록
    @PostMapping("/modifyER")
    public RedirectView modifyER(@RequestParam("eventBoardNumber")Long eventBoardNumber,
                                 @RequestParam("userNumber")Long userNumber,
                                 @RequestParam("eventNumber")Long eventNumber,
                                 EventBoardDto eventBoardDto,
                                 RedirectAttributes redirectAttributes, @RequestParam("eventBoardImg") MultipartFile files){


            eventBoardDto.setEventBoardNumber(eventBoardNumber);
            eventBoardDto.setUserNumber(userNumber);
            eventBoardDto.setEventNumber(eventNumber);

        log.info(eventBoardDto.toString()+"*******************===========================");

        reviewService.modifyEventReview(eventBoardDto, files);
        redirectAttributes.addAttribute("eventBoardNumber", eventBoardDto.getEventBoardNumber());

        return new RedirectView("/board/reviewEventDetail");

    }

    //이벤트 후기 삭제
    @GetMapping("/removeEReview")
    public RedirectView removeEventReview(Long eventBoardNumber){
        reviewService.removeEventReview(eventBoardNumber);
        return new RedirectView("eventReview");
    }


}