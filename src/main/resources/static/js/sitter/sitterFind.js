

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

  

  function openModal(modalname){
    $("#modal").fadeIn(300);
    $("."+modalname).fadeIn(300);
  }
  
  $("#modal, .close").on('click',function(){
    $("#modal").fadeOut(300);
    $(".modal-con").fadeOut(300);
  });
  
  
  $('.mon').click(function() {

    if($(this).hasClass("mon") === true) {
      $(this).addClass("day");
      $(this).removeClass("mon");
      return false;
    } else {
      $(this).addClass("mon");
      $(this).removeClass("day");
  
    }

  });

  $(".sitterTime").click(function() {
  
    if($(this).hasClass("sitterTime") == true) {
      $(this).addClass("timeSitter")
      $(this).removeClass("sitterTime")
    } else {
      $(this).addClass("sitterTime")
      $(this).removeClass("timeSitter")
      
    }

  });




  // select 주소 설정
  $('document').ready(function() {
      var area0 = ["주소 선택","서울특별시","인천광역시"]
      var area1 = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
      var area2 = ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"];
   
    // 시/도 선택 박스 초기화
   
    $("select[name^=sido]").each(function() {
     $selsido = $(this);
     $.each(eval(area0), function() {
      $selsido.append("<option value='"+this+"'>"+this+"</option>");
     });
     $selsido.next().append("<option value=''>상세 선택</option>");
    });
   
    // 시/도 선택시 구/군 설정
   
    $("select[name^=sido]").change(function() {
     var area = "area"+$("option",$(this)).index($("option:selected",$(this))); // 선택지역의 구군 Array
     var $gugun = $(this).next(); // 선택영역 군구 객체
     $("option",$gugun).remove(); // 구군 초기화
   
     if(area == "area0")
      $gugun.append("<option value=''>상세 선택</option>");
     else {
      $.each(eval(area), function() {
       $gugun.append("<option value='"+this+"'>"+this+"</option>");
      });
     }
    });
   
   
   });

  //select 주소 설정