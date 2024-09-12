/* 
 alertify.notify('текст сообщения', 'тип сообщения', 'время в секундах');
 тип сообщения:
 - success - зелый
 - error - красный
 - message - белый
 - warning - желтый
*/

export function Allertify() {
  const timeShow = 5; // 5s default
  document
    .getElementById('allerty-success')
    .addEventListener('click', function () {
      alertify.notify('Editet success', 'success', timeShow);
    });

  document
    .getElementById('allerty-error')
    .addEventListener('click', function () {
      alertify.notify('Deleted success', 'error', timeShow);
    });

  document
    .getElementById('allerty-message')
    .addEventListener('click', function () {
      alertify.notify('Lorem ipsum dolor sit amet', 'message', timeShow);
    });

  document
    .getElementById('allerty-warning')
    .addEventListener('click', function () {
      alertify.notify('Warning', 'warning', timeShow);
    });
}

/* ------------------------------------------------------ */
// const time = 5000;
// document.querySelectorAll('.allerty').forEach(div => {
//   const message = div.textContent.trim();
//   const type = div.getAttribute('type-allerty');

//   alertify.notify(message, type, time);
// });

function showAllerty(message, type) {
  const time = 5000;
  alertify.notify(message, type, time);
}
// showAllerty('Lorem ipsum dolor sit amet', 'message');
// showAllerty('Error message', 'error');

// document
//   .querySelector('.test')
//   .addEventListener('click', () => showAllerty('Error message', 'error'));
