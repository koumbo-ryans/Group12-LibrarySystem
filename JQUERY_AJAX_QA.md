# jQuery And AJAX Q&A
## 1. Did we use jQuery?
Yes. jQuery is used in `js/main.js` for a few small tasks. Most of the project still uses plain JavaScript.
## 2. Where is jQuery loaded?
In both `index.html` and `dashboard.html`:
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```
## 3. Why did we use jQuery?
To simplify smooth scrolling, AJAX loading, and a few event handlers.
## 4. Where is jQuery used for page loading?
```js
$(function() {
    ...
});
```
This runs the code after the HTML document is ready.
## 5. Where is jQuery used for smooth scrolling?
```js
$('a[href^="#"]').on('click', function(event) {
    const target = $(this.getAttribute('href'));
    $('html, body').stop().animate({ scrollTop: target.offset().top - 80 }, 1000);
});
```
It makes section links like `#about` and `#features` scroll smoothly.
## 6. Where is jQuery used on the dashboard?
```js
$('#search-input').on('keyup', function() {
    renderBooks(this.value);
});
$('#cancel-btn').on('click', resetForm);
```
It handles search typing and the cancel button.
## 7. Did we use AJAX?
Yes. AJAX is used to load default books from a JSON file.
## 8. Where is AJAX used?
```js
$.getJSON('data/default-books.json').done(data => {
    books = data;
    renderBooks();
}).fail(renderBooks);
```
This is in `js/main.js`.
## 9. What does `$.getJSON()` do?
`$.getJSON()` is a jQuery AJAX method. It requests a JSON file without refreshing the page.
## 10. Which file does AJAX load?
```text
data/default-books.json
```
This file stores the default book records.
## 11. When does AJAX run?
AJAX runs only when there are no saved books in `localStorage`.
## 12. What if books already exist in localStorage?
The app skips AJAX and displays the saved browser books.
## 13. What if AJAX fails?
```js
.fail(renderBooks)
```
The app still works by displaying the built-in default books from `main.js`.
## 14. Does AJAX refresh the page?
No. AJAX loads data in the background without refreshing the page.
## 15. Why is AJAX useful here?
It separates starter book data from the JavaScript file and shows how external data can be loaded dynamically.
## 16. Final summary?
jQuery is used for document-ready, smooth scrolling, search typing, cancel button handling, and AJAX. AJAX loads `default-books.json` without refreshing the page.
