# JavaScript And jQuery Guide
This guide explains `js/main.js`. **JavaScript** controls the data and logic, while **jQuery** helps select elements, handle events, update the page, and animate scrolling.
## 1. Starting The Script
```js
$(document).ready(function() {
    ...
});
```
This jQuery code waits until the HTML is loaded before running the script. It ensures elements like `#book-form`, `#book-list`, and `#search-input` are available.
## 2. Book Data
```js
let books = [
    { id: "FET-001", title: "...", author: "...", category: "..." }
];
```
`books` is an array of objects. Each object stores one book with `id`, `title`, `author`, and `category`. `let` is used because the array may be replaced by saved data.
## 3. localStorage
```js
const storedBooks = localStorage.getItem('fet_books');
if (storedBooks) {
    books = JSON.parse(storedBooks);
}
```
`localStorage.getItem()` reads saved browser data. `JSON.parse()` converts saved text back into a JavaScript array.
```js
localStorage.setItem('fet_books', JSON.stringify(books));
```
`JSON.stringify()` converts the array into text so it can be stored in `localStorage`.
## 4. `renderBooks(filter = "")`
`renderBooks()` refreshes the table, applies search filtering, updates the book count, shows or hides the no-results message, and saves the latest data.
```js
const $bookList = $('#book-list');
$bookList.empty();
```
`$('#book-list')` selects the table body. `.empty()` clears old rows. The `$` in `$bookList` shows that the variable contains a jQuery object.
## 5. Filtering Books
```js
const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase())
);
```
`.filter()` creates a list of matching books. `.toLowerCase()` makes the search case-insensitive. `.includes()` checks whether the title contains the search text.
## 6. Showing Or Hiding Results
```js
if (filteredBooks.length === 0) {
    $('#no-results').show();
    $('#book-table').hide();
} else {
    $('#no-results').hide();
    $('#book-table').show();
}
```
`if/else` is JavaScript. `.show()` and `.hide()` are jQuery. If no books match, the table is hidden and the message is shown.
## 7. Creating Table Rows
```js
$bookList.append(`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><span class="badge">${book.category}</span></td>
        <td>
            <button class="btn-edit" data-index="${actualIndex}">Edit</button>
            <button class="btn-delete" data-index="${actualIndex}">Delete</button>
        </td>
    </tr>
`);
```
`.append()` inserts generated HTML into the table. Backticks create a template literal. `${book.title}` inserts JavaScript values. `data-index` stores the book position for edit and delete actions.
## 8. Book Count
```js
$('#book-count').text(`Total Books: ${books.length}`);
```
`.text()` updates page text. `books.length` gives the number of books.
## 9. Form Submission
```js
$('#book-form').on('submit', function(e) {
    e.preventDefault();
});
```
`.on('submit', ...)` listens for form submission. `e.preventDefault()` stops the browser from refreshing, so JavaScript can process the form.
## 10. Reading Inputs
```js
const id = $('#book-id').val().trim();
const title = $('#book-title').val().trim();
const author = $('#book-author').val().trim();
const category = $('#book-category').val();
```
`.val()` gets input values. `.trim()` removes extra spaces. `const` keeps each value fixed during the current form submission.
## 11. Duplicate ID Validation
```js
const isDuplicate = books.some((book, index) => book.id === id && index !== editIndex);
```
`.some()` checks whether another book already has the same ID. `index !== editIndex` allows the current book to keep its own ID during editing.
```js
alert("Error: A book with this ID already exists in the system.");
return;
```
`alert()` displays an error. `return` stops the function.
## 12. Add Or Update
```js
if (editIndex === -1) {
    books.push(bookData);
} else {
    books[editIndex] = bookData;
    resetForm();
}
```
`editIndex === -1` means add mode. `.push()` adds a new book. Otherwise, `books[editIndex] = bookData` updates an existing book.
## 13. Edit Button
```js
$(document).on('click', '.btn-edit', function() {
    const index = $(this).data('index');
    const book = books[index];
});
```
This uses event delegation because edit buttons are created dynamically. `$(this)` means the clicked button. `.data('index')` reads the stored book index.
```js
$('#book-id').val(book.id);
$('#book-title').val(book.title);
$('#book-author').val(book.author);
$('#book-category').val(book.category);
```
These lines place the selected book into the form. The form title and submit button are changed with `.text()`, and the cancel button is displayed with `.show()`.
## 14. Delete Button
```js
$(document).on('click', '.btn-delete', function() {
    if (confirm("Are you sure you want to remove this book from the catalog?")) {
        books.splice($(this).data('index'), 1);
        renderBooks();
    }
});
```
`confirm()` asks before deleting. `.splice(index, 1)` removes one book. `renderBooks()` refreshes the catalog and saves the result.
## 15. Search
```js
$('#search-input').on('keyup', function() {
    renderBooks($(this).val());
});
```
`keyup` runs whenever the user types. `$(this).val()` gets the search text and sends it to `renderBooks()`.
## 16. Reset Form
```js
function resetForm() {
    $('#form-title').text('Register Book');
    $('#submit-btn').text('Add Book to Catalog');
    $('#cancel-btn').hide();
    $('#edit-index').val('-1');
    $('#book-form')[0].reset();
}
```
This returns the form to add mode. `$('#book-form')[0]` accesses the real HTML form element, and `.reset()` clears the form.
## 17. Smooth Scroll
```js
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
});
```
This selects internal links like `#about` and `#features`.
```js
$('html, body').stop().animate({
    scrollTop: target.offset().top - 80
}, 1000);
```
`.stop()` prevents animation buildup. `.animate()` creates smooth scrolling. `target.offset().top - 80` adjusts for the fixed header.
## 18. Final Summary
JavaScript handles arrays, objects, conditions, validation, JSON, localStorage, filtering, adding, editing, and deleting.
jQuery handles selectors, events, `.val()`, `.text()`, `.show()`, `.hide()`, `.append()`, `.data()`, and `.animate()`.
