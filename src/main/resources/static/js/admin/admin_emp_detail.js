function confirmDelete() {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");
    
    if (isConfirmed) {
        // 사용자가 확인 버튼을 클릭한 경우
        // 삭제 작업을 여기에 추가하세요.
        alert("삭제되었습니다."); // 예시: 삭제가 완료되었다는 메시지를 표시
    } else {
        // 사용자가 취소 버튼을 클릭한 경우
        // 아무 작업도 필요하지 않습니다.
        alert("삭제가 취소되었습니다.");
    }
}