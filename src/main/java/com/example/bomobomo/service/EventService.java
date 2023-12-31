package com.example.bomobomo.service;

import com.example.bomobomo.domain.dto.EmpDto;
import com.example.bomobomo.domain.dto.EventDto;
import com.example.bomobomo.domain.vo.Criteria;
import com.example.bomobomo.domain.vo.EmpVo;
import com.example.bomobomo.domain.vo.EventPayVo;
import com.example.bomobomo.domain.vo.EventVo;
import com.example.bomobomo.mapper.EventMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventMapper eventMapper;


    public List<EventVo> findAll(){
        return eventMapper.selectAll();
    }

//    디테일페이지 이동(조회)
    public EventVo find(Long eventNumber){
        if (eventNumber == null) {
            throw new IllegalArgumentException("이벤트 번호 누락!!");
        }
        return Optional.ofNullable(eventMapper.select(eventNumber))
                .orElseThrow(() -> { throw new IllegalArgumentException("존재하지 않는 이벤트 번호!"); });
    }

//    이벤트 결제페이지 이동
    public EventVo payment(Long eventNumber){
        if (eventNumber == null) {
            throw new IllegalArgumentException("이벤트 번호 누락!!");
        }
        return Optional.ofNullable(eventMapper.payment(eventNumber))
                .orElseThrow(() -> { throw new IllegalArgumentException("존재하지 않는 이벤트 번호!"); });
    }


//    전체 직원 조회
    public List<EmpVo> findEmpAll(Criteria criteria) {
        return eventMapper.selectEmpAll(criteria);
    }

//    전체 직원수 조회

    public int getTotal(){
        return eventMapper.selectTotal();
    }


//    이벤트 결제 후 데이터 넘기기
    public void saveEvent(EventPayVo eventPayVo) {
        eventMapper.saveEvent(eventPayVo);
    }

    public void savePayment(EventPayVo eventPayVo) {
        eventMapper.savePayment(eventPayVo);
    }

}
