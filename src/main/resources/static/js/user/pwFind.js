$(".pwFindBtn").click(function() {

    let id = $("#id").val();
    let name = $("#name").val();
    let email = $("#email").val();

    if(id && name && email ) {

    } else {
        alert("모든 정보를 기입 해주세요.");
        return false;
    }

    if(email.includes('@')) {
    } else {
        $('.labelEm').css('display','block')  
        $('.labelPh').css('display','none')
    }


    alert("임시 패스워드가 이메일로 송신되었습니다.");
    location.href = "/user/html/login.html";
});


$(".verifiedCh").click(function() {
    let email = $("#email").val();


    if(email.includes('@')) {
        alert("인증번호가 송신되었습니다.");
        return false;
    } else {
        alert("올바른 이메일을 입력하세요.");
        return false;

    }

    if(email) {
    } else {
        alert("이메일을 입력해주세요.");
        return false;
    }

})
