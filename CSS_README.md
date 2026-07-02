# CSS Styling Guide

This file explains how `css/style.css` styles the FET Library Management System. The stylesheet controls the layout, colors, typography, spacing, dashboard design, responsiveness, and small animations.

## 1. Global Variables

```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #d4af37;
    --text-color: #333;
    --white: #ffffff;
    --transition: all 0.3s ease;
}
```

These variables store repeated design values. For example, `--accent-color` is the gold color used in buttons, highlights, borders, and headings. Variables make the design easier to update.

## 2. Reset And Base Styles

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

This removes default browser spacing and makes sizing easier to control. `box-sizing: border-box` means padding and borders are included inside an element's width.

The `body` rule sets the main font, text color, background color, and prevents horizontal scrolling.

## 3. Typography

```css
h1, h2, h3 {
    font-family: 'Playfair Display', serif;
}
```

Headings use `Playfair Display` for a more formal academic feel. Normal text uses `Poppins`, which is cleaner and easier to read.

## 4. Container

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}
```

The container keeps content centered and prevents it from stretching too wide on large screens.

## 5. Header And Navigation

The `header` is fixed at the top of the page:

```css
header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}
```

This makes the navigation stay visible while scrolling. The `z-index` keeps it above other content.

The navigation uses Flexbox:

```css
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

This places the logo on one side and the links on the other.

## 6. Buttons

The project has reusable button styles:

- `.btn-primary`
- `.btn-large`
- `.btn-outline`
- `.btn-block`
- `.btn-muted`

Buttons use transitions so hover effects feel smooth.

```css
transition: var(--transition);
```

## 7. Hero Section

The hero section uses a full-screen background image:

```css
.hero {
    height: 100vh;
    background: url('../assets/hero-bg.jpg') no-repeat center center/cover;
}
```

`100vh` means the hero takes the full height of the browser window. The background image covers the section.

The `.hero-overlay` adds a dark layer over the image so the white text is readable.

## 8. About Section

The About section uses CSS Grid:

```css
.grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
    gap: 5rem;
}
```

This creates two columns: one for text and one for the image. The image column is slightly wider.

The image height is controlled:

```css
.about-img img {
    height: clamp(300px, 34vw, 390px);
    object-fit: cover;
}
```

`clamp()` keeps the image from becoming too short or too tall. `object-fit: cover` crops the image neatly without stretching it.

## 9. About Points

The numbered About points are styled as small rows:

```css
.about-points li {
    display: flex;
    align-items: center;
    gap: 0.9rem;
}
```

Each number is inside a styled `span`, which creates the `01`, `02`, `03` labels.

## 10. Features Section

The feature cards use a three-column grid:

```css
.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
```

Each card has a white background, border, shadow, and gold top border. The small line above each heading is created with:

```css
.feature-card h3::before {
    content: "";
    display: block;
    width: 42px;
    height: 3px;
}
```

This replaced the old icons and keeps the design clean.

## 11. Dashboard Layout

The dashboard uses a wider container and a two-column layout:

```css
.dashboard-container {
    display: grid;
    grid-template-columns: minmax(320px, 360px) minmax(0, 1fr);
    gap: 2rem;
}
```

The first column is the book form. The second column is the search bar and catalog table.

## 12. Dashboard Hero

`.dashboard-hero` creates the dark intro banner at the top of the dashboard. It uses a dark gradient, white text, gold eyebrow text, and a shadow.

## 13. Cards And Forms

`.card` is reused for the form and catalog sections. It provides background, padding, border radius, and shadow.

Form inputs use:

```css
.form-group input, .form-group select {
    width: 100%;
    min-height: 48px;
}
```

This makes form fields full width and easier to use.

Focus styles:

```css
.form-group input:focus,
.form-group select:focus {
    border-color: var(--accent-color);
}
```

This highlights the active input field.

## 14. Search Bar

The search bar is positioned relative so the search icon can be placed inside it:

```css
.search-bar {
    position: relative;
}
```

The icon uses absolute positioning:

```css
.search-icon {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
}
```

## 15. Table Styling

The table styles improve readability:

- `border-collapse: collapse` removes spacing between cells.
- `th` styles the table headings.
- `td` styles the table content.
- `tr:hover` highlights rows when the mouse passes over them.
- `tr:nth-child(even)` gives alternating rows a light background.

## 16. Badges And Action Buttons

`.badge` styles the category label. `.btn-edit` and `.btn-delete` style the Edit and Delete buttons with different colors so their actions are easy to identify.

## 17. Footer

The footer uses the primary dark color with centered white text:

```css
footer {
    background: var(--primary-color);
    color: var(--white);
}
```

## 18. Animation

```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

This creates a soft entrance animation for the hero content.

## 19. Responsive Design

The media query at `900px` changes multi-column layouts into one column:

```css
@media (max-width: 900px) {
    .grid,
    .features-grid,
    .dashboard-container {
        grid-template-columns: 1fr;
    }
}
```

The media query at `600px` reduces spacing and font sizes for mobile screens.

## 20. Summary

The stylesheet is organized around sections of the website:

- global setup
- navigation
- hero
- about
- features
- dashboard
- forms
- table
- footer
- responsiveness

The main CSS techniques used are variables, Flexbox, CSS Grid, pseudo-elements, hover effects, focus states, media queries, and keyframe animation.

## 21. Questions

### What framework was used?

No external CSS framework was used. The project does not use Bootstrap, Tailwind CSS, Bulma, Foundation, or any other ready-made CSS framework.

The styling is written with custom CSS in `css/style.css`.

This means the layout, buttons, cards, table, form, colors, spacing, and responsive behavior were designed manually using CSS features such as:

- CSS variables
- Flexbox
- CSS Grid
- media queries
- pseudo-elements
- hover effects
- focus states
- keyframe animation

### What does the styling system do?

The custom styling system gives the website its visual identity and structure. It controls:

- the black and gold color theme
- the fixed navigation bar
- the hero section background and overlay
- the About section grid layout
- the feature cards
- the dashboard form and table layout
- the input, button, badge, and table styles
- the mobile and tablet layout changes

### How responsive is the website?

The website is responsive because it uses media queries at `900px` and `600px`.

At screens below `900px`:

- the About section changes from two columns to one column
- the Features section changes from three cards in one row to stacked cards
- the Dashboard layout changes from two columns to one column
- the sticky form becomes normal so it scrolls naturally

At screens below `600px`:

- page padding becomes smaller
- headings reduce in size
- buttons stack vertically in the hero section
- cards get smaller padding
- the dashboard table header stacks vertically
- the About image becomes shorter

This makes the site usable on desktop, tablet, and mobile screens.
