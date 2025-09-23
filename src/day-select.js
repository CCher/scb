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

    clearAllClasses();

    if (selectedDates.includes(date)) {
      selectedDates = [];
      rangeStart = null;
      rangeEnd = null;
    } else {
      if (selectedDates.length === 0) {
        selectedDates.push(date);
        rangeStart = index;
        target.classList.add('calendar__day--selected');
      } else if (selectedDates.length === 1) {
        selectedDates.push(date);
        rangeEnd = index;

        if (rangeStart > rangeEnd) {
          [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
        }

        // Проверяем, соседние ли даты
        if (rangeEnd - rangeStart === 1) {
          // Соседние даты
          days[rangeStart].classList.remove('calendar__day--selected');
          days[rangeStart].classList.add('calendar__day--range-first');
          days[rangeStart].style.setProperty('--after-width', 'calc(100% + 18px)');
          
          days[rangeEnd].classList.add('calendar__day--range-last');
        } else {
          // Не соседние даты
          days[rangeStart].classList.remove('calendar__day--selected');
          days[rangeStart].classList.add('calendar__day--range-first');
          days[rangeStart].style.setProperty('--after-width', 'calc(100% + 8px)');
          
          days[rangeEnd].classList.add('calendar__day--range-last');
          applyRangeClasses();
        }
      } else {
        selectedDates = [date];
        rangeStart = index;
        target.classList.add('calendar__day--selected');
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
      day.style.removeProperty('--after-width'); // Сбрасываем кастомное свойство
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
