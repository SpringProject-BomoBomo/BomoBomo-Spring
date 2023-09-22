
// 후기관리 창 띄우기 
var isBoardVisible = false; // 초기에는 보이지 않는 상태
var isNull=false;
$('.reviewtab1').on('click', function() {
    if (!isNull) {
        // 다른 요소 숨김
        $('.review-list-area1').css('display', 'none');
        // 현재 요소 스타일 변경
        $('.reviewtab2').css('backgroundColor', 'white');
        $('.reviewtab2').css('color', 'black');
    }
    if (isBoardVisible) {
         // 이미 보이는 상태이면 숨김
         $('.reviewtab1').css('backgroundColor', 'white');
         $('.reviewtab1').css('color', 'black');
         $('.review-list-area').css('display', 'none');
    } else {
        $('.reviewtab1').css('backgroundColor', '#FF7000');
        $('.reviewtab1').css('color', 'white');
        $('.review-list-area').css('display', 'block'); // 보이지 않는 상태이면 보이게 함
    }
    
    // isBoardVisible = !isBoardVisible; 
    isNull=false;// 상태를 반대로 변경
    console.log(1);
});

// 이벤트관리 창 띄우기 

$('.reviewtab2').on('click',function(){
    if (!isBoardVisible) {
        // 다른 요소 숨김
        $('.review-list-area').css('display', 'none');
        // 현재 요소 스타일 변경
        $('.reviewtab1').css('backgroundColor', 'white');
        $('.reviewtab1').css('color','black');
        console.log("색상바꾸기 성공!")
    }
    if(isNull){
        $('.reviewtab2').css('backgroundColor', 'white');
        $('.reviewtab2').css('color', 'black');
        $('.review-list-area1').css('display', 'none');
    }else {
        $('.reviewtab2').css('backgroundColor', '#FF7000');
        $('.reviewtab2').css('color', 'white');
        $('.review-list-area1').css('display', 'block'); // 보이지 않는 상태이면 보이게 함
    }
    // isBoardVisible = false;
    // isNull =!isNull;
    isBoardVisible = false;
    
    console.log(2);
})

// 결제대기중 버튼 클릭이벤트
$('.siter-situation span').on('mouseover',function(){
    $(this).css('backgroundColor','#FF7000');
    $(this).css('color','white');
})

$('.siter-situation span').on('mouseout',function(){
    $(this).css('backgroundColor','white');
    $(this).css('color','#FF7000');
})

// 결제 페이지 클릭 버튼 이벤트 
$('.btn').on('mouseover',function(){
    $(this).css('backgroundColor','#FF7000');
    $(this).css('color','white');
})

$('.btn').on('mouseout',function(){
    $(this).css('backgroundColor','white');
    $(this).css('color','#FF7000');
})

//결제 대기 클릭시 결제 페이지 작동 

$('.siter-situation span').on('click',function(){
    $('.modal-pay').css('display','block');

})

//결제하기 결제하기 클릭시 카카오페이로 이동하는 js
$("#check_module").click(function () {
    var IMP = window.IMP; // 생략가능
    IMP.init('imp22267731'); 
    // i'mport 관리자 페이지 -> 내정보 -> 가맹점식별코드
    // ''안에 띄어쓰기 없이 가맹점 식별코드를 붙여넣어주세요. 안그러면 결제창이 안뜹니다.
    IMP.request_pay({
       pg: 'kakaopay.TC0ONETIME',
       pay_method: 'card',
       merchant_uid: 'merchant_' + new Date().getTime(),
       /* 
        *  merchant_uid에 경우 
        *  https://docs.iamport.kr/implementation/payment
        *  위에 url에 따라가시면 넣을 수 있는 방법이 있습니다.
        */
       name: '주문명 : 알뜰살뜰 돌보기',
       // 결제창에서 보여질 이름
       // name: '주문명 : ${auction.a_title}',
       // 위와같이 model에 담은 정보를 넣어 쓸수도 있습니다.
       amount: 10000000,
       // amount: ${bid.b_bid},
       // 가격 
       buyer_name: '김성찬',
       // 구매자 이름, 구매자 정보도 model값으로 바꿀 수 있습니다.
       // 구매자 정보에 여러가지도 있으므로, 자세한 내용은 맨 위 링크를 참고해주세요.
       buyer_postcode: '123-456',
       }, function (rsp) {
          console.log(rsp);
       if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
          msg += '결제 금액 : ' + rsp.paid_amount;
          // success.submit();
          // 결제 성공 시 정보를 넘겨줘야한다면 body에 form을 만든 뒤 위의 코드를 사용하는 방법이 있습니다.
          // 자세한 설명은 구글링으로 보시는게 좋습니다.
       } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          // 창이 사라지고 원래 페이지로 이동 
       }
       alert(msg);
       window.location.href='../html/mypage_main.html';
    });
 });