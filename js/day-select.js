// day-select.js
export function initDaySelect() {
  const calendar = document.querySelector('.calendar');
  const days = document.querySelectorAll('.calendar__day');
  let selectedDates = [];
  let rangeStart = null;
  let rangeEnd = null;

  calendar.addEventListener('click', (event) => {
    const target = event.target.closest('.calendar__day');
    if (!target) return;

    const date = target.textContent;
    const index = Array.from(days).indexOf(target);

    // Очищаем все классы перед обработкой
    clearAllClasses();

    if (selectedDates.includes(date)) {
      // Если дата уже выбрана - удаляем все выделения
      selectedDates = [];
      rangeStart = null;
      rangeEnd = null;
    } else {
      if (selectedDates.length === 0) {
        // Первая выбранная дата
        selectedDates.push(date);
        rangeStart = index;
        target.classList.add('calendar__day--range-first');
      } else if (selectedDates.length === 1) {
        // Вторая выбранная дата - формируем диапазон
        selectedDates.push(date);
        rangeEnd = index;

        if (rangeStart > rangeEnd) {
          // Меняем местами если конец раньше начала
          [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
        }

        target.classList.add('calendar__day--range-last');
        applyRangeClasses();
      } else {
        // Третья дата - сбрасываем все
        selectedDates = [date];
        rangeStart = index;
        target.classList.add('calendar__day--range-first');
      }
    }
  });

  function clearAllClasses() {
    days.forEach(day => {
      day.classList.remove(
        'calendar__day--selected',
        'calendar__day--range-first',
        'calendar__day--range-last',
        'calendar__day--range'
      );
    });
  }

  function applyRangeClasses() {
    if (rangeStart !== null && rangeEnd !== null) {
      for (let i = rangeStart + 1; i < rangeEnd; i++) {
        days[i].classList.add('calendar__day--range');
      }
    }
  }
}