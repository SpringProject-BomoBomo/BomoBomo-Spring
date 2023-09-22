
// 후기게시판 자동이동
let $reviewBox = $('.review-panel ul ');
let reviewWidth = 880;
let reviewWidth2 = 880;

let currentIndex = 0;
let $reviewBox2 = $('.review-panel2 ul');



function reviewSlide(){

    $reviewBox2.css('left', '-880px');
    currentIndex++;

    let newPosition = -(currentIndex * reviewWidth);
    let newPosition2 = (currentIndex * reviewWidth2);

    $reviewBox2.css('transform', 'translateX('  + newPosition2 + 'px)')
    $reviewBox2.css('transition', '9.5s linear')

    $reviewBox.css('transform', 'translateX(' + newPosition + 'px)')
    $reviewBox.css('transition', '9.5s linear')
    console.log('currentIndex : ' + currentIndex);

    if(currentIndex==1){

        currentIndex=-1;
    }

}
setTimeout(() => {
    reviewSlide();
}, 0);


function startTimer() {
    timer = setInterval(reviewSlide, 10000);

}
startTimer();




// 카카오맵 API
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.6575256, 127.0615864),
    level: 2
};
var map = new kakao.maps.Map(container, options);
var markerPosition  = new kakao.maps.LatLng(37.6575256, 127.0615864);
var marker = new kakao.maps.Marker({
    position: markerPosition
});
marker.setMap(map);




