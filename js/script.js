// add hovered class in selected list item
const list = document.querySelectorAll('.container-layout nav ul li');

function activeLink() {
  list.forEach(item => item.classList.remove('hovered'));
  this.classList.add('hovered');
}

list.forEach(item => item.addEventListener('mouseenter', activeLink));
// ------------------------------------------------------------ //

// menu toggle
const menuToggle = document.querySelector('.topbar .toggle');
const navigation = document.querySelector('.navigation');
const main = document.querySelector('.main');

menuToggle.addEventListener('click', () => {
  navigation.classList.toggle('active');
  main.classList.toggle('active');

  // Save state to localStorage
  const isActive = navigation.classList.contains('active');
  localStorage.setItem('menuActive', isActive);
});

// Restore menu state from localStorage on page load
const savedState = localStorage.getItem('menuActive');

if (savedState === 'true') {
  navigation.classList.add('active');
  main.classList.add('active');
}
// ------------------------------------------------------------ //

// toggle dark light mode
const body = document.querySelector('body');
const buttonToggle = document.querySelector('.dark-light-mode-icon');
const icon = document.querySelectorAll('.dark-light-mode-icon .icon');

buttonToggle.addEventListener('click', () => {
  icon.forEach(item => item.classList.toggle('show'));
  body.classList.toggle('dark');

  const theme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    icon.forEach(item => item.classList.toggle('show'));
  }
} else {
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (prefersDarkScheme) {
    body.classList.add('dark');
    icon.forEach(item => item.classList.toggle('show'));
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}
// ------------------------------------------------------------ //
