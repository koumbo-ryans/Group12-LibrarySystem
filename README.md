# FET Library Management System

A friendly and practical web-based library management system for the Faculty of Engineering and Technology. The project demonstrates how HTML, CSS, JavaScript, and jQuery work together to create a structured landing page and an interactive dashboard for managing books.

The system was designed for **Group 12 | 2025-2026**.

## Project Overview

The application has two main pages:

- `index.html`: The public landing page that introduces the FET Library Management System.
- `dashboard.html`: The working dashboard where books can be registered, searched, edited, and deleted.

The project uses:

- **HTML** for page structure and content.
- **CSS** for layout, spacing, colors, typography, responsiveness, and visual design.
- **JavaScript** for application logic, data handling, validation, and browser storage.
- **jQuery** for easier DOM selection, event handling, animations, and updating the page dynamically.
- **localStorage** for saving books in the browser so the catalog remains after refreshing.

## Folder Structure

```text
BB/
+-- index.html
+-- dashboard.html
+-- README.md
+-- css/
|   +-- style.css
+-- js/
|   +-- main.js
+-- assets/
    +-- hero-bg.jpg
    +-- about-bg.jpg
```

## How The App Flows

The user first opens `index.html`. This page explains the purpose of the system and provides navigation links. When the user clicks **Get Started** or **Go to Dashboard**, they are taken to `dashboard.html`.

On the dashboard, the user can:

1. Enter book details in the registration form.
2. Add the book to the catalog.
3. Search for books by title.
4. Edit an existing book.
5. Delete a book.
6. Refresh the page and still see saved books because the data is stored in `localStorage`.

The main interaction flow is controlled by `js/main.js`.

## Page Sections

### 1. Header And Navigation

Both `index.html` and `dashboard.html` contain a fixed header.

```html
<header>
    <nav class="container">
        <div class="logo">FET<span>LIBRARY</span></div>
        <ul class="nav-links">
            ...
        </ul>
    </nav>
</header>
```

Important points:

- The logo is split into `FET` and `LIBRARY` so CSS can color the second part differently.
- The navigation links help users move between sections or pages.
- The header is fixed using CSS, so it stays at the top while scrolling.

### 2. Hero Section

The hero section is the first major visual area on the home page.

```html
<section id="home" class="hero">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
        <h1>Faculty Library <br>Management System</h1>
        <p>...</p>
    </div>
</section>
```

What it does:

- Uses `assets/hero-bg.jpg` as the background.
- Uses `.hero-overlay` to darken the image so the text is readable.
- Contains the main title, short description, and buttons.

### 3. About Section

The About section explains the purpose of the system.

```html
<section id="about" class="about">
    <div class="container grid">
        <div class="about-text">...</div>
        <div class="about-img">...</div>
    </div>
</section>
```

Important structure:

- `.grid` creates a two-column layout.
- `.about-text` contains text and key project points.
- `.about-img` contains the image.
- CSS controls the image height with `height: clamp(300px, 34vw, 390px);` so it does not become too tall compared to the text.

The numbered rows:

```html
<ul class="about-points">
    <li><span>01</span>Structured catalog...</li>
</ul>
```

These points explain the educational purpose of the project: structure, jQuery interaction, and JavaScript storage.

### 4. Features Section

The Features section presents the main system capabilities.

```html
<section id="features" class="features">
    <div class="features-grid">
        <div class="feature-card">...</div>
    </div>
</section>
```

The three feature cards are:

- Smart Registration
- Instant Search
- Full Control

Each card uses a clean inline SVG icon instead of emoji icons. This makes the design look more professional and less generic.

### 5. Dashboard Hero

The dashboard page has a short intro section:

```html
<section class="dashboard-hero">
    <p class="eyebrow">Faculty of Engineering and Technology</p>
    <h1>Library Dashboard</h1>
    <p>Register, search, edit, and manage faculty books...</p>
</section>
```

This makes the dashboard feel more complete and gives the user context before using the form and catalog.

### 6. Book Registration Form

The form is inside an `<aside>` element:

```html
<aside class="card form-card">
    <form id="book-form">
        ...
    </form>
</aside>
```

Fields in the form:

- Book ID
- Book Title
- Author
- Category

The hidden field:

```html
<input type="hidden" id="edit-index" value="-1">
```

This is important. It tells the JavaScript whether the user is adding a new book or editing an existing one.

- `-1` means add a new book.
- Any other number means edit the book at that index in the array.

### 7. Search And Catalog Table

The search bar:

```html
<input type="text" id="search-input" placeholder="Search books by title...">
```

The table:

```html
<table id="book-table">
    <tbody id="book-list"></tbody>
</table>
```

The `<tbody>` is empty in the HTML because jQuery fills it dynamically from JavaScript.

## CSS Design System

The CSS starts with global variables:

```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #d4af37;
    --text-color: #333;
    --light-bg: #f9f9f9;
    --white: #ffffff;
    --transition: all 0.3s ease;
}
```

Why this is useful:

- Colors are easier to reuse.
- The design remains consistent.
- If the accent color changes, it can be changed in one place.

### Layout Techniques Used

The project uses CSS Grid:

```css
.grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
}
```

This creates the two-column About layout.

The dashboard also uses CSS Grid:

```css
.dashboard-container {
    display: grid;
    grid-template-columns: minmax(320px, 360px) minmax(0, 1fr);
}
```

This gives the form a stable width and allows the catalog to take the remaining space.

### Responsiveness

The project uses media queries:

```css
@media (max-width: 900px) {
    .grid,
    .features-grid,
    .dashboard-container {
        grid-template-columns: 1fr;
    }
}
```

This means that on smaller screens, multi-column layouts become one-column layouts. This improves readability on tablets and phones.

## JavaScript And jQuery Flow

All main behavior is in `js/main.js`.

The script starts with:

```js
$(document).ready(function() {
    ...
});
```

This is jQuery syntax. It waits until the HTML page has loaded before running the code. This prevents JavaScript from trying to select elements that do not exist yet.

## Initial Book Data

The system starts with sample books:

```js
let books = [
    { id: "FET-001", title: "Engineering Drawing for Cameroon Students", author: "Ngwa Patrick", category: "Mechanical Engineering" },
    ...
];
```

This is an array of objects.

Each book object has:

- `id`
- `title`
- `author`
- `category`

Example object:

```js
{
    id: "FET-001",
    title: "Engineering Drawing for Cameroon Students",
    author: "Ngwa Patrick",
    category: "Mechanical Engineering"
}
```

## localStorage

The app uses browser `localStorage` to save books.

```js
const storedBooks = localStorage.getItem('fet_books');
```

This checks if books were already saved in the browser.

```js
if (storedBooks) {
    books = JSON.parse(storedBooks);
}
```

`localStorage` stores data as text, so `JSON.parse()` converts the saved text back into a JavaScript array.

When books are updated, the app saves them again:

```js
localStorage.setItem('fet_books', JSON.stringify(books));
```

`JSON.stringify()` converts the JavaScript array into text so it can be stored in the browser.

## The renderBooks Function

```js
function renderBooks(filter = "") {
    ...
}
```

This function displays the book list in the table.

It receives an optional `filter` value. If no filter is provided, the default value is an empty string.

### Step 1: Select And Clear The Table Body

```js
const $bookList = $('#book-list');
$bookList.empty();
```

This uses jQuery:

- `$('#book-list')` selects the table body.
- `.empty()` removes old table rows before new rows are inserted.

### Step 2: Filter Books

```js
const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase())
);
```

This is plain JavaScript.

How it works:

- `.filter()` creates a new array.
- `book.title.toLowerCase()` makes the book title lowercase.
- `filter.toLowerCase()` makes the search text lowercase.
- `.includes()` checks if the title contains the search text.

This makes the search case-insensitive.

### Step 3: Show No Results Or Table

```js
if (filteredBooks.length === 0) {
    $('#no-results').show();
    $('#book-table').hide();
} else {
    $('#no-results').hide();
    $('#book-table').show();
}
```

This is a mixture of JavaScript logic and jQuery DOM manipulation.

- `if` and `else` are JavaScript.
- `.show()` and `.hide()` are jQuery.

### Step 4: Add Rows Dynamically

```js
$bookList.append(`
    <tr>
        <td><strong>${book.id}</strong></td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><span class="badge">${book.category}</span></td>
        <td class="actions">
            <button class="btn-edit" data-index="${actualIndex}">Edit</button>
            <button class="btn-delete" data-index="${actualIndex}">Delete</button>
        </td>
    </tr>
`);
```

Important syntax:

- Backticks create a template literal.
- `${book.id}` inserts JavaScript values inside HTML.
- `data-index` stores the book position so edit and delete buttons know which book to affect.
- `.append()` is jQuery and adds the row into the table.

## Add And Update Book

The form is handled with:

```js
$('#book-form').on('submit', function(e) {
    e.preventDefault();
    ...
});
```

This means: when the form is submitted, run this function.

`e.preventDefault()` stops the browser from refreshing the page.

### Reading Form Values

```js
const id = $('#book-id').val().trim();
const title = $('#book-title').val().trim();
const author = $('#book-author').val().trim();
const category = $('#book-category').val();
```

Explanation:

- `.val()` gets the value from an input.
- `.trim()` removes extra spaces from the beginning and end.
- `const` creates a variable that should not be reassigned.

### Duplicate ID Validation

```js
const isDuplicate = books.some((book, index) => book.id === id && index !== editIndex);
```

This checks if another book already uses the same ID.

Important syntax:

- `.some()` returns `true` if at least one item matches.
- `book.id === id` checks if IDs are the same.
- `index !== editIndex` prevents the current book from being counted as a duplicate while editing.

If a duplicate is found:

```js
alert("Error: A book with this ID already exists in the system.");
return;
```

`return` stops the function from continuing.

### Add Or Update Logic

```js
if (editIndex === -1) {
    books.push(bookData);
} else {
    books[editIndex] = bookData;
    resetForm();
}
```

If `editIndex` is `-1`, a new book is added using `.push()`.

If `editIndex` is another number, the existing book at that index is replaced.

## Edit Book Functionality

```js
$(document).on('click', '.btn-edit', function() {
    ...
});
```

This is jQuery event delegation.

It is used because edit buttons are created dynamically. The buttons do not exist when the page first loads, so the click event is attached to `document` and listens for clicks on `.btn-edit`.

The selected index is read using:

```js
const index = $(this).data('index');
```

`$(this)` means the button that was clicked.

`.data('index')` reads the value from `data-index`.

The form is then filled:

```js
$('#book-id').val(book.id);
$('#book-title').val(book.title);
$('#book-author').val(book.author);
$('#book-category').val(book.category);
```

The form title and button text also change:

```js
$('#form-title').text('Edit Book');
$('#submit-btn').text('Update Book');
$('#cancel-btn').show();
```

## Delete Book Functionality

```js
$(document).on('click', '.btn-delete', function() {
    if (confirm("Are you sure you want to remove this book from the catalog?")) {
        const index = $(this).data('index');
        books.splice(index, 1);
        renderBooks();
    }
});
```

How it works:

- `confirm()` asks the user to confirm deletion.
- `.data('index')` gets the book index.
- `.splice(index, 1)` removes one book from the array.
- `renderBooks()` refreshes the table and updates localStorage.

## Search Functionality

```js
$('#search-input').on('keyup', function() {
    renderBooks($(this).val());
});
```

This runs whenever the user types in the search bar.

`$(this).val()` gets the search text and sends it to `renderBooks()`.

## Cancel Edit Function

```js
$('#cancel-btn').on('click', function() {
    resetForm();
});
```

When the user clicks **Cancel Edit**, the form returns to normal.

The reset function:

```js
function resetForm() {
    $('#form-title').text('Register Book');
    $('#submit-btn').text('Add Book to Catalog');
    $('#cancel-btn').hide();
    $('#edit-index').val('-1');
    $('#book-form')[0].reset();
}
```

Important detail:

```js
$('#book-form')[0].reset();
```

`$('#book-form')` gives a jQuery object. `[0]` accesses the original HTML form element so the native `.reset()` method can be used.

## Smooth Scroll

```js
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    ...
});
```

This selects all links whose `href` starts with `#`, such as `#about` and `#features`.

The animation:

```js
$('html, body').stop().animate({
    scrollTop: target.offset().top - 80
}, 1000);
```

Explanation:

- `.stop()` prevents multiple animations from stacking.
- `.animate()` creates smooth scrolling.
- `target.offset().top` gets the vertical position of the target section.
- `-80` adjusts for the fixed header.
- `1000` means the animation takes 1000 milliseconds.

## JavaScript Vs jQuery In This Project

### JavaScript Is Used For

- Storing the books array.
- Creating book objects.
- Filtering books.
- Checking duplicate IDs.
- Adding, updating, and deleting array items.
- Saving and reading from localStorage.
- Converting data with `JSON.parse()` and `JSON.stringify()`.
- Using conditions like `if` and `else`.
- Using browser dialogs like `alert()` and `confirm()`.

### jQuery Is Used For

- Waiting for the page to load with `$(document).ready()`.
- Selecting elements like `$('#book-list')`.
- Handling events with `.on()`.
- Showing and hiding elements with `.show()` and `.hide()`.
- Reading and setting input values with `.val()`.
- Changing text with `.text()`.
- Adding table rows with `.append()`.
- Creating smooth scroll animations with `.animate()`.

## Important Syntax Summary

### jQuery Selector

```js
$('#book-list')
```

Selects the element with `id="book-list"`.

### Event Handler

```js
$('#book-form').on('submit', function(e) {
    ...
});
```

Runs code when the form is submitted.

### Template Literal

```js
`Total Books: ${books.length}`
```

Allows variables to be inserted into strings.

### Arrow Function

```js
books.filter(book => book.title.includes(filter))
```

A shorter way to write a function.

### Object

```js
const bookData = { id, title, author, category };
```

This creates a book object. Because the variable names and property names are the same, JavaScript allows this short syntax.

### Array Method

```js
books.push(bookData);
```

Adds a new book to the end of the array.

## How To Run The Project

No installation is required.

Open `index.html` in a browser, then click **Get Started** or **Go to Dashboard**.

Because jQuery and Google Fonts are loaded from online CDNs, an internet connection helps the page display exactly as intended. The basic HTML, CSS, and local JavaScript files are still part of the project folder.

## Key Learning Points

This project demonstrates:

- How to structure a website with semantic HTML sections.
- How to style a modern interface with CSS Grid, cards, spacing, shadows, and responsive media queries.
- How JavaScript manages data and logic.
- How jQuery simplifies DOM manipulation and user interaction.
- How localStorage can preserve data in the browser.
- How a simple static website can behave like a small application.

## Credits

Faculty of Engineering and Technology Library Management System  
Group 12 | 2025-2026
