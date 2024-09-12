# Layout for CONTRACTO application

### Custom CSS styles

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

- .fancy-scroll - Custom vertical scroll
- .group-container (Needs to be added variable: style="--min-column-width: 00px;") 00 - minimum column width

---

### Tabs widget

Tab component structure:

<div class="tabs" style="--tab-count: 4">
	<input type="radio" name="tabs" id="first-tab">
	<label for="first-tab">Tab text</label>
</div>

<div class="tabs-content">
	<div class="tab-content-1">Content</div>
</div>

To add a new Tab you need to:
style="--tab-count: 4" - Quantity tabs

1. Add a tab to HTML:
   &lt;input type="radio" name="tabs" id="first-tab"&gt;
   &lt;label for="first-tab">Tab text</label&gt;
   Write the next in order (in text, not numbers!) ID for input and FOR for label (ID and FOR must be the same).
2. Add content for a tab in HTML:
   &lt;div class="tabs-content"&gt;
   &lt;div class="tab-content-1">Content</div&gt;
   &lt;/div&gt;
   You need to specify the next digit ("tab-content-1") in the tab order.
3. In the file "tabs-widget.scss" need to add the following label
   &:has(:checked:nth-of-type(1)) {
   --active: 0;
   }
   and
   &:has(:checked:nth-of-type(1)) .tab-content-1,
