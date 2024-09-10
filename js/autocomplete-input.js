export const Autocomplete = (function () {
  'use strict';
  function t(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function');
  }
  function e(t, e, n) {
    return (
      e &&
        (function (t, e) {
          for (var n = 0; n < e.length; n++) {
            var s = e[n];
            (s.enumerable = s.enumerable || !1),
              (s.configurable = !0),
              'value' in s && (s.writable = !0),
              Object.defineProperty(t, i(s.key), s);
          }
        })(t.prototype, e),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      t
    );
  }
  function n(t, e, n) {
    return (
      (e = i(e)) in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function i(t) {
    var e = (function (t, e) {
      if ('object' != typeof t || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(t, e || 'default');
        if ('object' != typeof i) return i;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === e ? String : Number)(t);
    })(t, 'string');
    return 'symbol' == typeof e ? e : e + '';
  }
  var s = function (t, e) {
      return t.matches
        ? t.matches(e)
        : t.msMatchesSelector
        ? t.msMatchesSelector(e)
        : t.webkitMatchesSelector
        ? t.webkitMatchesSelector(e)
        : null;
    },
    o = function (t, e) {
      return t.closest
        ? t.closest(e)
        : (function (t, e) {
            for (var n = t; n && 1 === n.nodeType; ) {
              if (s(n, e)) return n;
              n = n.parentNode;
            }
            return null;
          })(t, e);
    },
    u = e(function e() {
      var i,
        s = this,
        u = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        l = u.search,
        r = u.autoSelect,
        a = void 0 !== r && r,
        c = u.setValue,
        d = void 0 === c ? function () {} : c,
        h = u.setAttribute,
        p = void 0 === h ? function () {} : h,
        b = u.onUpdate,
        f = void 0 === b ? function () {} : b,
        v = u.onSubmit,
        m = void 0 === v ? function () {} : v,
        L = u.onShow,
        y = void 0 === L ? function () {} : L,
        g = u.autocorrect,
        w = void 0 !== g && g,
        R = u.onHide,
        S = void 0 === R ? function () {} : R,
        x = u.onLoading,
        A = void 0 === x ? function () {} : x,
        E = u.onLoaded,
        k = void 0 === E ? function () {} : E,
        I = u.submitOnEnter,
        C = void 0 !== I && I;
      t(this, e),
        n(this, 'value', ''),
        n(this, 'searchCounter', 0),
        n(this, 'results', []),
        n(this, 'selectedIndex', -1),
        n(this, 'selectedResult', null),
        n(this, 'destroy', function () {
          (s.search = null),
            (s.setValue = null),
            (s.setAttribute = null),
            (s.onUpdate = null),
            (s.onSubmit = null),
            (s.autocorrect = null),
            (s.onShow = null),
            (s.onHide = null),
            (s.onLoading = null),
            (s.onLoaded = null);
        }),
        n(this, 'handleInput', function (t) {
          var e = t.target.value;
          s.updateResults(e), (s.value = e);
        }),
        n(this, 'handleKeyDown', function (t) {
          var e = t.key;
          switch (e) {
            case 'Up':
            case 'Down':
            case 'ArrowUp':
            case 'ArrowDown':
              var n =
                'ArrowUp' === e || 'Up' === e
                  ? s.selectedIndex - 1
                  : s.selectedIndex + 1;
              t.preventDefault(), s.handleArrows(n);
              break;
            case 'Tab':
              s.selectResult();
              break;
            case 'Enter':
              var i = t.target.getAttribute('aria-activedescendant').length > 0;
              (s.selectedResult =
                s.results[s.selectedIndex] || s.selectedResult),
                s.selectResult(),
                s.submitOnEnter
                  ? s.selectedResult && s.onSubmit(s.selectedResult)
                  : i
                  ? t.preventDefault()
                  : (s.selectedResult && s.onSubmit(s.selectedResult),
                    (s.selectedResult = null));
              break;
            case 'Esc':
            case 'Escape':
              s.hideResults(), s.setValue();
              break;
            default:
              return;
          }
        }),
        n(this, 'handleFocus', function (t) {
          var e = t.target.value;
          s.updateResults(e), (s.value = e);
        }),
        n(this, 'handleBlur', function () {
          s.hideResults();
        }),
        n(this, 'handleResultMouseDown', function (t) {
          t.preventDefault();
        }),
        n(this, 'handleResultClick', function (t) {
          var e = t.target,
            n = o(e, '[data-result-index]');
          if (n) {
            s.selectedIndex = parseInt(n.dataset.resultIndex, 10);
            var i = s.results[s.selectedIndex];
            s.selectResult(), s.onSubmit(i);
          }
        }),
        n(this, 'handleArrows', function (t) {
          var e = s.results.length;
          (s.selectedIndex = ((t % e) + e) % e),
            s.onUpdate(s.results, s.selectedIndex);
        }),
        n(this, 'selectResult', function () {
          var t = s.results[s.selectedIndex];
          t && s.setValue(t), s.hideResults();
        }),
        n(this, 'updateResults', function (t) {
          var e = ++s.searchCounter;
          s.onLoading(),
            s.search(t).then(function (t) {
              e === s.searchCounter &&
                ((s.results = t),
                s.onLoaded(),
                0 !== s.results.length
                  ? ((s.selectedIndex = s.autoSelect ? 0 : -1),
                    s.onUpdate(s.results, s.selectedIndex),
                    s.showResults())
                  : s.hideResults());
            });
        }),
        n(this, 'showResults', function () {
          s.setAttribute('aria-expanded', !0), s.onShow();
        }),
        n(this, 'hideResults', function () {
          (s.selectedIndex = -1),
            (s.results = []),
            s.setAttribute('aria-expanded', !1),
            s.setAttribute('aria-activedescendant', ''),
            s.onUpdate(s.results, s.selectedIndex),
            s.onHide();
        }),
        n(this, 'checkSelectedResultVisible', function (t) {
          var e = t.querySelector(
            '[data-result-index="'.concat(s.selectedIndex, '"]')
          );
          if (e) {
            var n = t.getBoundingClientRect(),
              i = e.getBoundingClientRect();
            i.top < n.top
              ? (t.scrollTop -= n.top - i.top)
              : i.bottom > n.bottom && (t.scrollTop += i.bottom - n.bottom);
          }
        }),
        (this.search =
          ((i = l),
          Boolean(i && 'function' == typeof i.then)
            ? l
            : function (t) {
                return Promise.resolve(l(t));
              })),
        (this.autoSelect = a),
        (this.setValue = d),
        (this.setAttribute = p),
        (this.onUpdate = f),
        (this.onSubmit = m),
        (this.autocorrect = w),
        (this.onShow = y),
        (this.onHide = S),
        (this.onLoading = A),
        (this.onLoaded = k),
        (this.submitOnEnter = C);
    }),
    l = 0,
    r = (function () {
      return e(
        function e(n, i, s) {
          t(this, e),
            (this.id = ''.concat(s, '-result-').concat(n)),
            (this.class = ''.concat(s, '-result')),
            (this['data-result-index'] = n),
            (this.role = 'option'),
            n === i && (this['aria-selected'] = 'true');
        },
        [
          {
            key: 'toString',
            value: function () {
              var t = this;
              return Object.keys(this).reduce(function (e, n) {
                return ''.concat(e, ' ').concat(n, '="').concat(t[n], '"');
              }, '');
            },
          },
        ]
      );
    })(),
    a = e(function e(i) {
      var s = this,
        o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        a = o.search,
        c = o.onSubmit,
        d = void 0 === c ? function () {} : c,
        h = o.onUpdate,
        p = void 0 === h ? function () {} : h,
        b = o.baseClass,
        f = void 0 === b ? 'autocomplete' : b,
        v = o.autocorrect,
        m = void 0 !== v && v,
        L = o.autoSelect,
        y = o.getResultValue,
        g =
          void 0 === y
            ? function (t) {
                return t;
              }
            : y,
        w = o.renderResult,
        R = o.debounceTime,
        S = void 0 === R ? 0 : R,
        x = o.resultListLabel,
        A = o.submitOnEnter,
        E = void 0 !== A && A;
      t(this, e),
        n(this, 'expanded', !1),
        n(this, 'loading', !1),
        n(this, 'position', {}),
        n(this, 'resetPosition', !0),
        n(this, 'initialize', function () {
          (s.root.style.position = 'relative'),
            s.input.setAttribute('role', 'combobox'),
            s.input.setAttribute('autocomplete', 'off'),
            s.input.setAttribute('autocapitalize', 'off'),
            s.autocorrect && s.input.setAttribute('autocorrect', 'on'),
            s.input.setAttribute('spellcheck', 'false'),
            s.input.setAttribute('aria-autocomplete', 'list'),
            s.input.setAttribute('aria-haspopup', 'listbox'),
            s.input.setAttribute('aria-expanded', 'false'),
            s.resultList.setAttribute('role', 'listbox');
          var t = (function (t) {
            if (null != t && t.length) {
              var e = t.startsWith('#');
              return {
                attribute: e ? 'aria-labelledby' : 'aria-label',
                content: e ? t.substring(1) : t,
              };
            }
          })(s.resultListLabel);
          t && s.resultList.setAttribute(t.attribute, t.content),
            (s.resultList.style.position = 'absolute'),
            (s.resultList.style.zIndex = '1'),
            (s.resultList.style.width = '100%'),
            (s.resultList.style.boxSizing = 'border-box'),
            s.resultList.id ||
              (s.resultList.id = (function () {
                return ''
                  .concat(
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : ''
                  )
                  .concat(++l);
              })(''.concat(s.baseClass, '-result-list-'))),
            s.input.setAttribute('aria-owns', s.resultList.id),
            document.body.addEventListener('click', s.handleDocumentClick),
            s.input.addEventListener('input', s.core.handleInput),
            s.input.addEventListener('keydown', s.core.handleKeyDown),
            s.input.addEventListener('focus', s.core.handleFocus),
            s.input.addEventListener('blur', s.core.handleBlur),
            s.resultList.addEventListener(
              'mousedown',
              s.core.handleResultMouseDown
            ),
            s.resultList.addEventListener('click', s.core.handleResultClick),
            s.updateStyle();
        }),
        n(this, 'destroy', function () {
          document.body.removeEventListener('click', s.handleDocumentClick),
            s.input.removeEventListener('input', s.core.handleInput),
            s.input.removeEventListener('keydown', s.core.handleKeyDown),
            s.input.removeEventListener('focus', s.core.handleFocus),
            s.input.removeEventListener('blur', s.core.handleBlur),
            s.resultList.removeEventListener(
              'mousedown',
              s.core.handleResultMouseDown
            ),
            s.resultList.removeEventListener('click', s.core.handleResultClick),
            (s.root = null),
            (s.input = null),
            (s.resultList = null),
            (s.getResultValue = null),
            (s.onUpdate = null),
            (s.renderResult = null),
            s.core.destroy(),
            (s.core = null);
        }),
        n(this, 'setAttribute', function (t, e) {
          s.input.setAttribute(t, e);
        }),
        n(this, 'setValue', function (t) {
          s.input.value = t ? s.getResultValue(t) : '';
        }),
        n(this, 'renderResult', function (t, e) {
          return '<li '.concat(e, '>').concat(s.getResultValue(t), '</li>');
        }),
        n(this, 'handleUpdate', function (t, e) {
          var n, i, o, u;
          (s.resultList.innerHTML = ''),
            t.forEach(function (t, n) {
              var i = new r(n, e, s.baseClass),
                o = s.renderResult(t, i);
              'string' == typeof o
                ? s.resultList.insertAdjacentHTML('beforeend', o)
                : s.resultList.insertAdjacentElement('beforeend', o);
            }),
            s.input.setAttribute(
              'aria-activedescendant',
              e > -1 ? ''.concat(s.baseClass, '-result-').concat(e) : ''
            ),
            s.resetPosition &&
              ((s.resetPosition = !1),
              (s.position =
                ((n = s.input),
                (i = s.resultList),
                (o = n.getBoundingClientRect()),
                (u = i.getBoundingClientRect()),
                o.bottom + u.height > window.innerHeight &&
                window.innerHeight - o.bottom < o.top &&
                window.pageYOffset + o.top - u.height > 0
                  ? 'above'
                  : 'below')),
              s.updateStyle()),
            s.core.checkSelectedResultVisible(s.resultList),
            s.onUpdate(t, e);
        }),
        n(this, 'handleShow', function () {
          (s.expanded = !0), s.updateStyle();
        }),
        n(this, 'handleHide', function () {
          (s.expanded = !1), (s.resetPosition = !0), s.updateStyle();
        }),
        n(this, 'handleLoading', function () {
          (s.loading = !0), s.updateStyle();
        }),
        n(this, 'handleLoaded', function () {
          (s.loading = !1), s.updateStyle();
        }),
        n(this, 'handleDocumentClick', function (t) {
          s.root.contains(t.target) || s.core.hideResults();
        }),
        n(this, 'updateStyle', function () {
          (s.root.dataset.expanded = s.expanded),
            (s.root.dataset.loading = s.loading),
            (s.root.dataset.position = s.position),
            (s.resultList.style.visibility = s.expanded ? 'visible' : 'hidden'),
            (s.resultList.style.pointerEvents = s.expanded ? 'auto' : 'none'),
            'below' === s.position
              ? ((s.resultList.style.bottom = null),
                (s.resultList.style.top = '100%'))
              : ((s.resultList.style.top = null),
                (s.resultList.style.bottom = '100%'));
        }),
        (this.root = 'string' == typeof i ? document.querySelector(i) : i),
        (this.input = this.root.querySelector('input')),
        (this.resultList = this.root.querySelector('ul')),
        (this.baseClass = f),
        (this.autocorrect = m),
        (this.getResultValue = g),
        (this.onUpdate = p),
        'function' == typeof w && (this.renderResult = w),
        (this.resultListLabel = x),
        (this.submitOnEnter = E);
      var k,
        I,
        C,
        U = new u({
          search: a,
          autoSelect: L,
          setValue: this.setValue,
          setAttribute: this.setAttribute,
          onUpdate: this.handleUpdate,
          autocorrect: this.autocorrect,
          onSubmit: d,
          onShow: this.handleShow,
          onHide: this.handleHide,
          onLoading: this.handleLoading,
          onLoaded: this.handleLoaded,
          submitOnEnter: this.submitOnEnter,
        });
      S > 0 &&
        (U.handleInput =
          ((k = U.handleInput),
          (I = S),
          function () {
            var t = this,
              e = arguments;
            clearTimeout(C),
              (C = setTimeout(function () {
                (C = null), k.apply(t, e);
              }, I));
          })),
        (this.core = U),
        this.initialize();
    });
  return a;
})();
