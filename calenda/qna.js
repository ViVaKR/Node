// JavaScript for QnA page
document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body'); // 달력의 날짜를 표시하는 tbody
    // const monthYear = document.getElementById('month-year'); // 현재 년월을 표시하는 h2
    const yearEl = document.getElementById('year'); // 현재 년월을 표시하는 h2
    const monthEl = document.getElementById('month'); // 현재 년월을 표시하는 h2
    const prevMonthButton = document.getElementById('prev-month'); // 이전 달로 이동하는 버튼
    const nextMonthButton = document.getElementById('next-month'); // 다음 달로 이동하는 버튼
    const todayButton = document.getElementById('today-button'); // 오늘 날짜로 이동하는 버튼
    const clearButton = document.getElementById('clear-button'); // 선택된 날짜를 지우는 버튼
    const selectedDateElement = document.getElementById('selected-date'); // 선택된 날짜를 표시하는
    const yearModal = document.getElementById('year-modal'); // 년도를 설정하는 모달
    const yearInput = document.getElementById('year-input'); // 년도를 입력하는 input
    const setYearButton = document.getElementById('set-year'); // 년도를 설정하는 버튼
    const monthModal = document.getElementById('month-modal'); // 월을 설정하는 모달
    const monthInput = document.getElementById('month-input'); // 월을 입력하는 input
    const setMonthButton = document.getElementById('set-month'); // 월을 설정하는 버튼

    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar(date) { // 달력을 그리는 함수
        calendarBody.innerHTML = ''; // 달력을 초기화
        const year = date.getFullYear(); // 현재 년도
        const month = date.getMonth(); // 현재 달

        // monthYear.textContent = `${year}년 ${date.toLocaleString('default', { month: 'long' })}`;
        yearEl.textContent = `${year}년`;
        monthEl.textContent = `${month + 1}월`;

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 1일의 요일
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // 마지막 날짜

        const prevMonthLastDate = new Date(year, month, 0).getDate(); // 이전 달의 마지막 날짜
        const nextMonthStartDate = 1; // 다음 달의 시작 날짜

        let row = document.createElement('tr'); // 행을 생성

        for (let i = 0; i < firstDayOfMonth; i++) { // 이전 달의 날짜를 표시
            const cell = document.createElement('td'); // 셀을 생성
            cell.textContent = prevMonthLastDate - firstDayOfMonth + i + 1; // 이전 달의 마지막 날짜에서 1일의 요일을 뺀 값부터 표시
            cell.classList.add('other-month'); // 다른 달의 날짜임을 표시
            row.appendChild(cell); // 행에 셀을 추가
        }

        for (let i = 1; i <= lastDateOfMonth; i++) { // 이번 달의 날짜를 표시
            if (row.children.length === 7) { //   행이 7개의 셀을 가지면
                calendarBody.appendChild(row); //    행을 tbody에 추가하고 새로운 행을 생성
                row = document.createElement('tr'); //   새로운 행을 생성
            }

            const cell = document.createElement('td'); // 셀을 생성
            cell.textContent = i; // 날짜를 표시
            cell.addEventListener('click', () => { // 셀을 클릭하면
                document.querySelectorAll('td').forEach(td => td.classList.remove('selected')); // 모든 셀의 selected 클래스를 제거
                cell.classList.add('selected'); // 클릭한 셀에 selected 클래스를 추가
                selectedDate = new Date(year, month, i); //   선택된 날짜를 저장

                selectedDateElement.textContent = // 선택된 날짜를 표시
                    `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
            });

            row.appendChild(cell); // 행에 셀을 추가
        }

        let nextMonthDay = nextMonthStartDate; // 다음 달의 날짜

        while (row.children.length < 7) { // 마지막 주의 날짜를 표시
            const cell = document.createElement('td'); // 셀을 생성
            cell.textContent = nextMonthDay++; // 날짜를 표시
            cell.classList.add('other-month'); // 다른 달의 날짜임을 표시
            row.appendChild(cell); // 행에 셀을 추가
        }

        calendarBody.appendChild(row); // 마지막 행을 tbody에 추가
        highlightToday(); // 오늘 날짜를 강조
    }

    function highlightToday() { // 오늘 날짜를 강조하는 함수
        const today = new Date(); // 오늘 날짜

        if (currentDate.getMonth() === today.getMonth()
            && currentDate.getFullYear() === today.getFullYear()) { // 현재 달과 오늘 날짜의 달이 같고, 현재 년도와 오늘 날짜의 년도가 같으면
            document.querySelectorAll('td').forEach(td => { // 모든 셀에 대해 반복
                if (parseInt(td.textContent) === today.getDate() && !td.classList.contains('other-month')) { // 셀의 날짜가 오늘 날짜이고, 다른 달의 날짜가 아니면
                    td.classList.add('today'); // 셀에 today 클래스를 추가
                } else { // 그렇지 않으면
                    td.classList.remove('today'); // 셀의 today 클래스를 제거
                }
            });
        }
    }

    prevMonthButton.addEventListener('click', () => { // 이전 달로 이동하는 버튼을 클릭하면
        currentDate.setMonth(currentDate.getMonth() - 1); // 현재 달을 이전 달로 변경
        renderCalendar(currentDate); // 달력을 다시 그림
    });

    nextMonthButton.addEventListener('click', () => { // 다음 달로 이동하는 버튼을 클릭하면
        currentDate.setMonth(currentDate.getMonth() + 1); // 현재 달을 다음 달로 변경
        renderCalendar(currentDate); // 달력을 다시 그림
    });

    todayButton.addEventListener('click', () => { // 오늘 버튼을 클릭하면
        currentDate = new Date(); // 현재 날짜로 변경
        renderCalendar(currentDate); // 달력을 다시 그림
    });

    clearButton.addEventListener('click', () => { // 지우기 버튼을 클릭하면
        document.querySelectorAll('td')
            .forEach(td => td.classList.remove('selected')); // 모든 셀의 selected 클래스를 제거
        selectedDate = null; // 선택된 날짜를 초기화
        selectedDateElement.textContent = ''; // 선택된 날짜를 표시하는 요소를 초기화
    });

    yearEl.addEventListener('click', () => { // 년도를 클릭하면
        yearModal.style.display = 'block'; // 년도 설정 모달을 보여줌
    });

    setYearButton.addEventListener('click', () => { // 년도 설정 버튼을 클릭하면
        const year = parseInt(yearInput.value); // 입력한 년도를 가져옴

        if (!isNaN(year)) { // 입력한 년도가 숫자이면
            currentDate.setFullYear(year); // 현재 년도를 입력한 년도로 변경
            renderCalendar(currentDate); // 달력을 다시 그림
            yearModal.style.display = 'none'; // 년도 설정 모달을 숨김
        } else { // 그렇지 않으면
            alert('올바른 년도를 입력하세요.'); // 알림을 표시
        }
    });

    window.addEventListener('click', (event) => { // 모달 외부를 클릭하면
        if (event.target === yearModal) { // 년도 설정 모달이면
            yearModal.style.display = 'none'; // 년도 설정 모달을 숨김
        }
    });

    // Month
    monthEl.addEventListener('click', () => { // 월을 클릭하면
        monthModal.style.display = 'block'; // 월 설정 모달을 보여줌
    });

    setMonthButton.addEventListener('click', () => { // 월 설정 버튼을 클릭하면
        const month = parseInt(monthInput.value); // 입력한 월을 가져옴

        if (!isNaN(month)) { // 입력한 월이 숫자이면
            currentDate = new Date(currentDate.getFullYear(), month - 1, 1); // 현재 년도와 입력한 월로 현재 날짜를 변경
            renderCalendar(currentDate);    // 달력을 다시 그림
            monthModal.style.display = 'none';  // 월 설정 모달을 숨김
        } else { // 그렇지 않으면
            alert('올바른 월을 입력하세요.');
        }
    });

    window.addEventListener('click', (event) => { // 모달 외부를 클릭하면
        if (event.target === monthModal) { // 월 설정 모달이면
            monthModal.style.display = 'none'; // 월 설정 모달을 숨김
        }
    });

    renderCalendar(currentDate); // 페이지가 로드되면 달력을 그림
});
