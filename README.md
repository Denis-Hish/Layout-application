# Layout for CONTRACTO application

### Custom CSS styles

- .fancy-scroll - Custom vertical scroll
- .group-container (Needs to be added variable: style="--min-column-width: 00px;") 00 - minimum column width

#### Colors text

| Class               | Light mode | Dark mode |
| ------------------- | ---------- | --------- |
| .text-color         | #333       | #f3f4f8   |
| .text-white         | #f3f4f8    | #f3f4f8   |
| .text-blue          | #37a1f2    | #2a7cbb   |
| .text-blue-inverted | #2a7cbb    | #37a1f2   |
| .text-yellow        | #ffc107    | #ffc107   |
| .text-grey          | #999       | #999      |
| .text-red           | #f34639    | #dc3545   |
| .text-green         | #00aa2b    | #198754   |

#### Colors background

| Class             | Light mode | Dark mode |
| ----------------- | ---------- | --------- |
| .bg-color         | #f3f4f8    | #2f455a   |
| .bg-white         | #f3f4f8    | #f3f4f8   |
| .bg-blue          | #37a1f2    | #2a7cbb   |
| .bg-blue-inverted | #2a7cbb    | #37a1f2   |
| .bg-yellow        | #ffc107    | #ffc107   |
| .bg-grey          | #999       | #999      |
| .bg-red           | #f34639    | #dc3545   |
| .bg-green         | #00aa2b    | #198754   |

---

### Tabs widget

- Tab component structure:

```html
<div class="tabs" style="--tab-count: 4">
  <input type="radio" name="tabs" id="first-tab" />
  <label for="first-tab">Tab text</label>
</div>

<div class="tabs-content">
  <div class="tab-content-1">Content</div>
</div>
```

style="--tab-count: 4" - Quantity tabs

- To add a new Tab you need:

1. Add a tab to HTML:

```html
<input type="radio" name="tabs" id="first-tab" />
<label for="first-tab">Tab text</label>
```

Write the next in order (in text, not numbers!) ID for input and FOR for label (ID and FOR must be the same).

2. Add content for a tab in HTML:

```html
<div class="tabs-content">
  <div class="tab-content-1">Content</div>
</div>
```

You need to specify the next digit ("tab-content-1") in the tab order.

3. In the file "tabs-widget.scss" need to add the following label

```css
&:has(:checked:nth-of-type(1)) {
  --active: 0;
}
&:has(:checked:nth-of-type(1)) .tab-content-1 {
}
```

---

### Allertify messages

To show Allertify message, you need to call the showAllerty() function, by specifying the function parameters: message, type and time. If they do not specify them, the default parameters will be used:

- message = 'Allertify message'
- type = 'error'
- time = 5 (seconds)

Types of messages:

- success - green
- error - red
- message - blue
- warning - yellow

```js
function showAllerty(message = 'Allertify message', type = 'error', time = 5) {
  alertify.notify(message, type, time);
}
```

To call the showAllerty() function from HTML, the code below must be in the same HTML file.

How to call the showAllerty() function using parameters using the button example:

```html
<button
  type="button"
  class="btn btn-primary"
  onclick="showAllerty('Allertify message', 'success')"
>
  Show allerti
</button>
```

Here the message and type are specified, the time remains at default (5 second)

---
