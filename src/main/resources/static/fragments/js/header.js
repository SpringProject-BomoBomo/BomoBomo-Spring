$('.sub-menu').hide();

// $('.main-menu >li a').mouseenter(function(){
//     $('.sub-menu').stop().slideDown(2000);
// })


// 개별 메뉴 슬라이드 다운
// $('#downMenu').hover(function(){
//     $(this).children(".sub-menu").stop().slideDown(1000)
// })

// $('#downMenu').mouseleave(function(){
//     $(this).children(".sub-menu").stop().slideUp(1000)
// })

// $('#downMenu2').hover(function(){
//     $(this).children(".sub-menu").stop().slideDown(1000)
// })

// $('#downMenu2').mouseleave(function(){
//     $(this).children(".sub-menu").stop().slideUp(1000)
// })




// 전체 슬라이드 다운

$(function () {
    var hh = $(".header-wrap").height();
    var ih = $(".sub-menu").innerHeight();
    var maxHeight = hh + ih;

    console.log(maxHeight)

    $(".subMenu").hide();

    $(".main-menu").mouseenter(function () {
        $(".header-contaier")
            .stop()
            .animate({ height: maxHeight }, 100, "linear", function () {
                $(".sub-menu").fadeIn();
            });
    });

    $(".header-contaier").mouseleave(function () {
        $(".header-contaier")
            .stop()
            .animate({ height: hh }, 300, "linear", function () {
                $(".sub-menu").hide();
            });
    });


});


$(window).scroll(function () {
    $(".header-contaier").css("left", 0 - $(this).scrollLeft());
});

