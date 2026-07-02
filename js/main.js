$(function() {
    // Small jQuery part: smooth scrolling for landing-page anchor links.
    $('a[href^="#"]').on('click', function(event) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({ scrollTop: target.offset().top - 80 }, 1000);
        }
    });

    // Main JavaScript part: dashboard data, rendering, validation, and events.
    const form = document.getElementById('book-form');
    if (!form) return;

    const key = 'fet_books';
    const el = id => document.getElementById(id);
    const bookList = el('book-list');
    const bookTable = el('book-table');
    const noResults = el('no-results');
    const bookCount = el('book-count');
    const formTitle = el('form-title');
    const submitBtn = el('submit-btn');
    const cancelBtn = el('cancel-btn');
    const editIndexInput = el('edit-index');
    const inputs = {
        id: el('book-id'),
        title: el('book-title'),
        author: el('book-author'),
        category: el('book-category')
    };

    const defaultBooks = [
        { id: "FET-001", title: "Engineering Drawing for Cameroon Students", author: "Ngwa Patrick", category: "Mechanical Engineering" },
        { id: "FET-002", title: "Programming Fundamentals with JavaScript", author: "Manga Rose", category: "Software Engineering" },
        { id: "FET-003", title: "Power Systems and Electrical Machines", author: "Tchaptchet Emmanuel", category: "Electrical Engineering" },
        { id: "FET-004", title: "Construction Materials and Site Practice", author: "Nfor Linda", category: "Civil Engineering" },
        { id: "FET-005", title: "Telecommunications Networks in Cameroon", author: "Biyong Alain", category: "Telecommunications" }
    ];
    let books = JSON.parse(localStorage.getItem(key)) || defaultBooks;

    function renderBooks(filter = "") {
        const term = filter.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(term));

        bookList.innerHTML = filteredBooks.map(book => {
            const index = books.indexOf(book);
            return `
                <tr>
                    <td><strong>${book.id}</strong></td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td><span class="badge">${book.category}</span></td>
                    <td class="actions">
                        <button class="btn-edit" data-index="${index}">Edit</button>
                        <button class="btn-delete" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');

        noResults.style.display = filteredBooks.length ? 'none' : 'block';
        bookTable.style.display = filteredBooks.length ? 'table' : 'none';
        bookCount.textContent = `Total Books: ${books.length}`;
        localStorage.setItem(key, JSON.stringify(books));
    }

    function getFormData() {
        return {
            id: inputs.id.value.trim(),
            title: inputs.title.value.trim(),
            author: inputs.author.value.trim(),
            category: inputs.category.value
        };
    }

    function fillForm(book, index) {
        formTitle.textContent = 'Edit Book';
        submitBtn.textContent = 'Update Book';
        cancelBtn.style.display = 'block';
        editIndexInput.value = index;
        Object.keys(inputs).forEach(field => inputs[field].value = book[field]);
        document.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function resetForm() {
        formTitle.textContent = 'Register Book';
        submitBtn.textContent = 'Add Book to Catalog';
        cancelBtn.style.display = 'none';
        editIndexInput.value = '-1';
        form.reset();
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        const editIndex = Number(editIndexInput.value);
        const bookData = getFormData();
        const isDuplicate = books.some((book, index) => book.id === bookData.id && index !== editIndex);

        if (isDuplicate) {
            alert("Error: A book with this ID already exists in the system.");
            return;
        }

        editIndex === -1 ? books.push(bookData) : books[editIndex] = bookData;
        renderBooks();
        resetForm();
    });

    bookList.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button) return;

        const index = Number(button.dataset.index);
        if (button.classList.contains('btn-edit')) fillForm(books[index], index);

        if (button.classList.contains('btn-delete') && confirm("Are you sure you want to remove this book from the catalog?")) {
            books.splice(index, 1);
            renderBooks();
        }
    });

    // Small jQuery part: simple dashboard events.
    $('#search-input').on('keyup', function() {
        renderBooks(this.value);
    });
    $('#cancel-btn').on('click', resetForm);

    if (localStorage.getItem(key)) {
        renderBooks();
    } else {
        $.getJSON('data/default-books.json').done(data => {
            books = data;
            renderBooks();
        }).fail(renderBooks);
    }
});
