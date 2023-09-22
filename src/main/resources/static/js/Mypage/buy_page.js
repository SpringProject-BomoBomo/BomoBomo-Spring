var isBoardVisible = false; // 초기에는 보이지 않는 상태
var isNull=false;
$('.sitter-area').on('click', function() {
    if (!isNull) {
        // 다른 요소 숨김
        $('.buyboxp').css('display', 'none');
        // 현재 요소 스타일 변경
        $('.event-area').css('backgroundColor', 'white');
        $('.event-area').css('color', 'black');
    }
    if (isBoardVisible) {
         // 이미 보이는 상태이면 숨김
         $('.sitter-area').css('backgroundColor', 'white');
         $('.sitter-area').css('color', 'black');
         $('.buybox').css('display', 'none');
    } else {
        $('.sitter-area').css('backgroundColor', '#FF7000');
        $('.sitter-area').css('color', 'white');
        $('.buybox').css('display', 'block'); // 보이지 않는 상태이면 보이게 함
    }
    
    // isBoardVisible = !isBoardVisible; 
    isNull=false;// 상태를 반대로 변경
    console.log("임형준");
});

$('.event-area').on('click',function(){
    if (!isBoardVisible) {
        // 다른 요소 숨김
        $('.buybox').css('display', 'none');
        // 현재 요소 스타일 변경
        $('.sitter-area').css('backgroundColor', 'white');
        $('.sitter-area').css('color','black');
        console.log("색상바꾸기 성공!")
    }
    if(isNull){
        $('.event-area').css('backgroundColor', 'white');
        $('.event-area').css('color', 'black');
        $('.buyboxp').css('display', 'none');
    }else {
        $('.event-area').css('backgroundColor', '#FF7000');
        $('.event-area').css('color', 'white');
        $('.buyboxp').css('display', 'block'); // 보이지 않는 상태이면 보이게 함
    }
    // isBoardVisible = false;
    // isNull =!isNull;
    isBoardVisible = false;
    
    console.log(2);
})















console.log("안녕");
$('.text-page p').on('mouseover',function(){
    console.log("안녕");
    $(this).css('color','white');
    $(this).css('backgroundColor','#FF7000');

})

$('.text-page p').on('mouseout',function(){
    console.log("안녕");
    $(this).css('color','black');
    $(this).css('backgroundColor','white');

})

$('.text-page-2 p').on('mouseover',function(){
    console.log("안녕");
    $(this).css('color','white');
    $(this).css('backgroundColor','#FF7000');

})

$('.text-page-2 p').on('mouseout',function(){
    console.log("안녕");
    $(this).css('color','black');
    $(this).css('backgroundColor','white');

})