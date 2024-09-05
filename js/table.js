export function InitialDataTable() {
  new DataTable('#table', {
    // info: false, // информация в нижнем левом углу
    // ordering: false, // сортировка колонок таблицы
    // paging: false, // пагинация

    // положение пагинации
    // layout: {
    //   bottom: 'paging',
    //   bottomStart: null,
    //   bottomEnd: null,
    // },

    language: {
      lengthMenu: 'Pokaż _MENU_ wpisów', // Текст для "10 entries per page"
      search: 'Szukaj:', // Текст для строки поиска
      info: 'Wyświetlanie od _START_ do _END_ z _TOTAL_ wpisów',

      // перевод пагинации
      // paginate: {
      //   first: 'Pierwszy',
      //   last: 'Ostatni',
      //   next: 'Następny',
      //   previous: 'Poprzedni',
      // },
    },
  });
}
