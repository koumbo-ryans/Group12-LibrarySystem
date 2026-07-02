# Project Overview

## What is this project?

This is a web-based Library Management System for the Faculty of Engineering and Technology. It has a landing page and a dashboard where users can add, edit, delete, search, and save book records.

## Tech Stack

### HTML
HTML builds the page structure.

- `index.html` is the landing page.
- `dashboard.html` is the book management page.
- Sections, forms, navigation, tables, and buttons are written in HTML.

### CSS

CSS handles the visual design.

- `css/style.css` controls colors, spacing, fonts, cards, forms, tables, responsiveness, and animations.
- The project uses custom CSS, not Bootstrap or Tailwind.
- CSS Grid and Flexbox are used for layout.
- Media queries make the site work on desktop, tablet, and mobile.

### JavaScript

JavaScript controls most of the app logic.

- stores books in an array
- adds, edits, deletes, and searches books
- updates the table dynamically
- checks duplicate book IDs
- saves and loads data with `localStorage`

### jQuery

jQuery is used lightly.

- page-ready wrapper
- smooth scrolling
- search input event
- cancel edit button event
- AJAX JSON loading

### AJAX And JSON

AJAX is used through jQuery `$.getJSON()`.

- It loads starter books from `data/default-books.json`.
- It works without refreshing the page.
- If AJAX fails, built-in default books are used.
- JSON keeps starter book data separate from JavaScript code.

## Data Flow

The app first checks `localStorage`. If saved books exist, they are displayed. If not, AJAX loads the JSON book file. If AJAX fails, built-in default books are displayed.

## Summary

HTML gives structure, CSS gives design, JavaScript gives logic, jQuery gives small interactions, AJAX loads external data, JSON stores starter books, and localStorage keeps user changes in the browser.
