import './styles/main.scss';
import { initThemeSwitcher } from './theme-switcher.js';
import { initDaySelect } from './day-select.js';

initThemeSwitcher(document.querySelector('#theme-toggle'));
initDaySelect(document.querySelector('.calendar'));

// временное решение для "пустых" ссылок
    document.querySelectorAll('.calendar__day').forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
    // Проверка на тач-устройство
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      document.body.classList.add('is-touch');

      // Отключаем hover-эффекты
      document.querySelectorAll('.calendar__day').forEach(day => {
        day.classList.remove('hover-effect');
      });
    }