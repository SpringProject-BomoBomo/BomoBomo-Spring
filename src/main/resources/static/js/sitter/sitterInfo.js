const slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
const slideImg = document.querySelectorAll('.slides li'); //모든 슬라이드들
let currentIdx = 0; //현재 슬라이드 index
const slideCount = slideImg.length; // 슬라이드 개수

// alert("text1 : " + $('.preve'));
// alert("text2 : " + document.querySelector('.prev'));
// const prev = $('.prev');
// const next = $('.next');
 const prev = document.querySelector('.prev'); //이전 버튼
 const next = document.querySelector('.next'); //다음 버튼
const slideWidth = 300; //한개의 슬라이드 넓이
const slideMargin = 100; //슬라이드간의 margin 값

//전체 슬라이드 컨테이너 넓이 설정
slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

function moveSlide(num) {
    // slides.style.left = -num * 400 + 'px';
    slides.style.left = -num * 200 + 'px';
  currentIdx = num;
}

prev.addEventListener('click', function () {
  /*첫 번째 슬라이드로 표시 됐을때는 
  이전 버튼 눌러도 아무런 반응 없게 하기 위해 
  currentIdx !==0일때만 moveSlide 함수 불러옴 */

  if (currentIdx !== 0) moveSlide(currentIdx - 1);
});

next.addEventListener('click', function () {
  /* 마지막 슬라이드로 표시 됐을때는 
  다음 버튼 눌러도 아무런 반응 없게 하기 위해
  currentIdx !==slideCount - 1 일때만 
  moveSlide 함수 불러옴 */
  if (currentIdx !== slideCount - 1) {
    moveSlide(currentIdx + 1);
  }
});


$(function() {
  $(".sitterSelBtn").click(function() {
    $(".modal").fadeIn();
    $(".container").css("pointer-events", "none")
    $("body").css("background-color", "lightgray")
  });
  
  $(".modalX").click(function() {
    $(".modal").fadeOut();
    $(".container").css("pointer-events", "auto")
        $("body").css("background-color", "white")
  });
  
});


