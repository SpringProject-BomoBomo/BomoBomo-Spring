
//FAQ탭메뉴
$(".FAQ-container").each(function () {
    var tabMenuDiv = $(this);
    var menu_a = tabMenuDiv.find("a");
    var panelDiv = tabMenuDiv.find("div.panel");
    panelDiv.hide();

    var panelOne;
    var panelShow;

    panelOne = menu_a.filter(".on");
    panelShow = $(panelOne.attr("href"));
    panelShow.show();

    menu_a.click(function (x) {
        var currentA = $(this);
        var currentA_panel = $(currentA.attr("href"));
        x.preventDefault();

        panelOne.removeClass("on");
        currentA.addClass("on");

        panelShow.hide();
        currentA_panel.show();

        panelOne = currentA;
        panelShow = currentA_panel;

        currentA.click(function () {
            currentA_panel.children("ul").show();
        });
    });
});




//FAQ게시판
//하단 슬라이드 및 화살표 방향 바꾸기
$(document).ready(function() {
    $('.tab_list > li').each(function() {
        var $toggle = $(this).find('.drop_cont').children('dt');

        $toggle.click(function() {
            var $arrow = $(this).children('span');
            $arrow.toggleClass('rotated');


            //화살표에 rotated 클래스부여
            //rotated 클래스가 있으면 180도 회전
            if ($arrow.hasClass('rotated')) {
                $arrow.css({'transform':'rotate(180deg)'});
            } else {
                $arrow.css({'transform':'rotate(0deg)'});
            }

            var $dd = $(this).next('dd');
            $dd.stop().slideToggle(400);

            // 다른 항목의 화살표를 원래대로 돌려놓기
            $(this).parents('li').siblings('li').find('.drop_cont')
                .children('dt').children('span').removeClass('rotated').css({'transform':'rotate(0deg)'});

            // 다른 항목의 dd를 닫기
            $(this).parents('li').siblings('li').find('.drop_cont')
                .children('dd').slideUp(400);
        });
    });
});

