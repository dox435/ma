const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});
