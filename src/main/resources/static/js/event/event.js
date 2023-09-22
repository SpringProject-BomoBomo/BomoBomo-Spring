let $slideBox2 = $('.service-content-container ul');
let $slideImgs2 = $('.service-content-container ul img');
let slideWidth2 = 1051;
let currentIdx2 = 0;
let slideCnt2 = $slideImgs2.length;
console.log('slideCnt : ' + slideCnt2);
checkEnd2()

$('.recently-right-button').stop().on('click', function () {
    console.log('aa');
    currentIdx2++;
    console.log('currentIdx : ' + currentIdx2);
    $slideBox2.css('left', -(currentIdx2 * slideWidth2));
    $slideBox2.css('transition', '0.5s ease');
    checkEnd2()
    });

$('.recently-left-button').on('click', function () {
  console.log('bbb');
  currentIdx2--;
  console.log('currentIdx : ' + currentIdx2);
  $slideBox2.css('left', -(currentIdx2 * slideWidth2));
  $slideBox2.css('transition', '0.5s ease');
  checkEnd2()
});

function checkEnd2() {
  if (currentIdx2 <= 0) {
    $('.recently-left-button').css('display', 'none');
  } else {
    $('.recently-left-button').css('display', 'block');
  }

  if (currentIdx2==1) {
    $('.recently-right-button').css('display', 'none');
  } else {
    $('.recently-right-button').css('display', 'block');
  }
}