function createButtons() {
    //동적으로 보여질 버튼영역
    const ButtonContainer = document.querySelector('.board-page');
    //초기화
    ButtonContainer.innerHTML = '';
    //"게시글 항목 수 / 보여질 게시글 수" 를 올림하여 변수에 저장
    const totalPages = Math.ceil(postElements.length / page_num);

    //이전 버튼 동적 생성
    const prevButton = document.createElement('a');
    prevButton.textContent = '<';
    prevButton.classList.add('bt', 'first');
    prevButton.href = '#';
    //클릭 이벤트 추가, 현재 페이지가 1보다 클때만 동작
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayData();
            currentPageButtons();
        }
    });
    //버튼 컨테이너에 버튼 추가
    ButtonContainer.appendChild(prevButton);

    //페이지 숫자 버튼 생성, 클릭이벤트 추가
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('a');
        button.textContent = i;
        button.classList.add('num');
        console.log(i +"버튼 생성");
        button.href = '#';
        if (i === currentPage) {
            button.classList.add('on');
        } else {
            button.classList.remove('on');
        }


        button.addEventListener('click', () => {
            currentPage = i;
            
            displayData();
            currentPageButtons();
        });

        ButtonContainer.appendChild(button);
    }

    //다음 버튼 동적생성, 이전버튼과 같음
    const nextButton = document.createElement('a');
    nextButton.textContent = '>';
    nextButton.classList.add('bt', 'last');
    nextButton.href = '#';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayData();
            currentPageButtons();
        }
    });
    ButtonContainer.appendChild(nextButton);
    
}

function currentPageButtons() {
    const buttons = document.querySelectorAll('a.num');
    buttons.forEach((button, i) => {
        if (i + 1 === currentPage) {
            button.classList.add('on');
        } else {
            button.classList.remove('on');
        }
    });
}
    createButtons();
});