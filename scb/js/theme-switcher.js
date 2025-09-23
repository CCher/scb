// theme-switcher.js
export function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');

  // Получаем сохраненную тему из localStorage или устанавливаем значение по умолчанию
  let currentTheme = localStorage.getItem('theme') || 'light';

  // Применяем сохраненную тему при загрузке страницы
  document.body.classList.add(`theme-${currentTheme}`);

  themeToggle.addEventListener('click', () => {
    // Определяем новую тему
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Обновляем классы тела документа
    document.body.classList.remove(`theme-${currentTheme}`);
    document.body.classList.add(`theme-${newTheme}`);

    // Сохраняем новую тему в localStorage
    localStorage.setItem('theme', newTheme);

    // Обновляем текущую тему
    currentTheme = newTheme;
  });
}