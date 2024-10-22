document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');


    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const todayButton = document.getElementById('today-button');
    const clearButton = document.getElementById('clear-button');

    let currentDate = new Date();
    let isTodayHighlighted = false;

    function renderCalendar(date) {
        calendarDays.innerHTML = '';
        const month = date.getMonth();
        const year = date.getFullYear();

        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;


        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            calendarDays.appendChild(emptyDiv);
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.addEventListener('click', () => {
                document.querySelectorAll('.calendar-days div').forEach(div => div.classList.remove('selected'));
                dayDiv.classList.add('selected');
            });
            calendarDays.appendChild(dayDiv);
        }

        if (isTodayHighlighted) {
            highlightToday();
        }
    }

    function highlightToday() {
        const today = new Date().getDate();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        if (currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear) {
            document.querySelectorAll('.calendar-days div').forEach(div => {
                if (parseInt(div.textContent) === today) {
                    div.classList.add('today');
                } else {
                    div.classList.remove('today');
                }
            });
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    todayButton.addEventListener('click', () => {
        isTodayHighlighted = !isTodayHighlighted;
        currentDate = new Date();
        renderCalendar(currentDate);
        if (isTodayHighlighted) {
            highlightToday();
        }
    });

    clearButton.addEventListener('click', () => {
        isTodayHighlighted = false;
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
