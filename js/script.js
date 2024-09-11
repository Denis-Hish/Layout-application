'use strict';

import { InitialDataTable } from './table.js';
import { Allertify } from './allertify.js';
import { Autocomplete } from './autocomplete-input.js';

// Initial DataTables
InitialDataTable();

// Initial allertify
Allertify();

// add hovered class in selected list item
const list = document.querySelectorAll('.container-layout .navigation ul li');

function activeLink() {
  list.forEach(item => item.classList.remove('hovered'));
  this.classList.add('hovered');
}

list.forEach(item => item.addEventListener('mouseenter', activeLink));
// ------------------------------------------------------------ //

// menu toggle
const menuToggle = document.querySelector('.topbar .toggle i');
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

// Autocomplete input
// import { data } from './data.js';

// new Autocomplete('#autocomplete', {
//   search: input => {
//     // Возвращаем Promise, который резолвит список найденных данных
//     return new Promise(resolve => {
//       if (input.length < 3) {
//         return resolve([]);
//       }

//       // Фильтруем данные по совпадению строки
//       const results = data.filter(item =>
//         item.title.toLowerCase().includes(input.toLowerCase())
//       );

//       // Возвращаем отфильтрованный список
//       resolve(results);
//     });
//   },

//   // Возвращаем заголовок из найденного объекта
//   getResultValue: result => result.title,

//   // Обработка нажатия на выбранный результат
//   onSubmit: result => {
//     // window.location.href = `https://www.google.com/`; // в текущем окне
//     window.open('https://www.google.com/', '_blank'); // в новом окне
//     console.log(`Selected: ${result.title}`);
//   },
// });

/* Wikipedia */
const wikiUrl = 'https://en.wikipedia.org';
const params = 'action=query&list=search&format=json&origin=*';

new Autocomplete('#autocomplete', {
  // Search function can return a promise
  // which resolves with an array of
  // results. In this case we're using
  // the Wikipedia search API.
  search: input => {
    const url = `${wikiUrl}/w/api.php?${params}&srsearch=${encodeURI(input)}`;

    return new Promise(resolve => {
      if (input.length < 3) {
        return resolve([]);
      }

      fetch(url)
        .then(response => response.json())
        .then(data => {
          resolve(data.query.search);
        });
    });
  },

  // Control the rendering of result items.
  // Let's show the title and snippet
  // from the Wikipedia results
  renderResult: (result, props) => `
    <li ${props}>
      <div class="title">
        ${result.title}
      </div>
      <div class="snippet">
        ${result.snippet}
      </div>
    </li>
  `,

  // Wikipedia returns a format like this:
  //
  // {
  //   pageid: 12345,
  //   title: 'Article title',
  //   ...
  // }
  //
  // We want to display the title
  getResultValue: result => result.title,

  // Open the selected article in
  // a new window
  onSubmit: result => {
    window.open(`${wikiUrl}/wiki/${encodeURI(result.title)}`);
  },
});
// ------------------------------------------------------------ //

//! Prevention of link behavior when pressing (!!! DELETE THIS !!!)
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
  });
});
// ------------------------------------------------------------ //
