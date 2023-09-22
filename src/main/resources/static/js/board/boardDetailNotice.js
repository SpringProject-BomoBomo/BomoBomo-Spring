let listBtn = document.querySelector('.listBtn');
console.log(listBtn)

//공지사항 게시판 목록으로 이동
function showBoardNoticeList(){

    listBtn.addEventListener('click', function(){
        location.href="/board/html/boardNotice.html"
    })
}