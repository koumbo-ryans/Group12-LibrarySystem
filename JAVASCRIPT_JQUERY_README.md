# JavaScript And jQuery Guide
This guide explains the refactored `js/main.js`. The file now uses mostly **plain JavaScript**, with a small amount of **jQuery** for smooth scrolling, AJAX loading, search typing, and cancel-click handling. The functionality remains the same: add books, edit books, delete books, search books, save data, and load starter books.
## 1. jQuery Still Used For Page Ready And Smooth Scroll
```js
$(function() {
    ...
});
```
This is the short jQuery version of `$(document).ready(...)`. It waits for the HTML to load before running the script.
```js
$('a[href^="#"]').on('click', function(event) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({ scrollTop: target.offset().top - 80 }, 1000);
    }
});
```
This selects internal links like `#about`, prevents the default jump, and uses `.animate()` for smooth scrolling.
## 2. Dashboard Guard
```js
const form = document.getElementById('book-form');
if (!form) return;
```
The same script is loaded on both `index.html` and `dashboard.html`. This guard stops dashboard code from running on the home page, where the form does not exist.
## 3. Element Selection With JavaScript
```js
const el = id => document.getElementById(id);
const bookList = el('book-list');
const bookTable = el('book-table');
```
Instead of jQuery selectors like `$('#book-list')`, the refactor uses `document.getElementById()`. The helper `el` makes the code shorter.
## 4. Grouped Input Fields
```js
const inputs = {
    id: el('book-id'),
    title: el('book-title'),
    author: el('book-author'),
    category: el('book-category')
};
```
The input elements are grouped in one object. This makes reading and filling the form shorter and cleaner.
## 5. Book Data And localStorage
```js
let books = JSON.parse(localStorage.getItem(key)) || [
    { id: "FET-001", title: "...", author: "...", category: "..." }
];
```
This loads saved books from `localStorage`. If nothing is saved, the default FET sample books are used.
```js
localStorage.setItem(key, JSON.stringify(books));
```
`JSON.stringify()` converts the array into text so it can be stored in the browser.
## 6. Small AJAX Part
```js
$.getJSON('data/default-books.json').done(data => {
    books = data;
    renderBooks();
}).fail(renderBooks);
```
This is jQuery AJAX. It loads starter books from `data/default-books.json` when there are no saved books in `localStorage`. If loading fails, `.fail(renderBooks)` still displays the built-in default books.
## 7. Rendering Books
```js
function renderBooks(filter = "") {
    const term = filter.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(term));
    ...
}
```
`renderBooks()` displays the catalog. It also filters books when the user searches. `.filter()` creates a matching list, `.toLowerCase()` makes the search case-insensitive, and `.includes()` checks if the title contains the search text.
## 8. Building Table Rows
```js
bookList.innerHTML = filteredBooks.map(book => {
    const index = books.indexOf(book);
    return `
        <tr>
            <td><strong>${book.id}</strong></td>
            <td>${book.title}</td>
            <td>${book.author}</td>
        </tr>
    `;
}).join('');
```
This replaces jQuery `.append()`. `.map()` creates an array of HTML rows, and `.join('')` turns them into one HTML string. `innerHTML` places the rows inside the table body.
## 9. Showing And Hiding Elements
```js
noResults.style.display = filteredBooks.length ? 'none' : 'block';
bookTable.style.display = filteredBooks.length ? 'table' : 'none';
```
This replaces jQuery `.show()` and `.hide()`. It uses JavaScript style changes and a ternary operator.
## 10. Updating The Book Count
```js
bookCount.textContent = `Total Books: ${books.length}`;
```
This replaces jQuery `.text()`. `textContent` changes the visible text of an element.
## 11. Reading Form Data
```js
function getFormData() {
    return {
        id: inputs.id.value.trim(),
        title: inputs.title.value.trim(),
        author: inputs.author.value.trim(),
        category: inputs.category.value
    };
}
```
This replaces jQuery `.val()`. `.value` reads input values, and `.trim()` removes extra spaces.
## 12. Filling The Form For Editing
```js
function fillForm(book, index) {
    formTitle.textContent = 'Edit Book';
    submitBtn.textContent = 'Update Book';
    cancelBtn.style.display = 'block';
    editIndexInput.value = index;
    Object.keys(inputs).forEach(field => inputs[field].value = book[field]);
}
```
This switches the form to edit mode. `Object.keys(inputs)` loops through `id`, `title`, `author`, and `category`, then copies the selected book values into the form.
## 13. Resetting The Form
```js
function resetForm() {
    formTitle.textContent = 'Register Book';
    submitBtn.textContent = 'Add Book to Catalog';
    cancelBtn.style.display = 'none';
    editIndexInput.value = '-1';
    form.reset();
}
```
This returns the form to add mode. `form.reset()` clears the form fields.
## 14. Form Submission
```js
form.addEventListener('submit', event => {
    event.preventDefault();
    const editIndex = Number(editIndexInput.value);
    const bookData = getFormData();
});
```
This replaces jQuery `.on('submit', ...)`. `addEventListener()` listens for the submit event, and `preventDefault()` stops the page from refreshing.
## 15. Duplicate ID Validation
```js
const isDuplicate = books.some((book, index) => book.id === bookData.id && index !== editIndex);
```
`.some()` checks whether another book already has the same ID. `index !== editIndex` allows the edited book to keep its own ID.
## 16. Add Or Update Logic
```js
editIndex === -1 ? books.push(bookData) : books[editIndex] = bookData;
```
This short ternary replaces a longer `if/else`. If `editIndex` is `-1`, a new book is added. Otherwise, the selected book is updated.
## 17. Edit And Delete Events
```js
bookList.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
});
```
This is JavaScript event delegation. It listens on the table body and checks which button was clicked. This works because edit and delete buttons are created dynamically.
```js
const index = Number(button.dataset.index);
```
`dataset.index` reads the `data-index` value from the clicked button.
## 18. Search And Cancel
```js
el('search-input').addEventListener('keyup', event => renderBooks(event.target.value));
cancelBtn.addEventListener('click', resetForm);
```
These are small jQuery event handlers. Typing in the search box calls `renderBooks()`, and clicking cancel resets the form.
## 19. Final Summary
Plain JavaScript still handles most of the app: element selection, rendering, form values, validation, add/edit/delete, display changes, and localStorage.
jQuery remains for the page-ready wrapper, smooth-scroll animation, AJAX starter-book loading, search typing, and cancel-click handling.
