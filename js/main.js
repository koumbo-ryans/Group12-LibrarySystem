$(document).ready(function() {
    // Initial data to make the UI look good on first load
    let books = [
        { id: "FET-001", title: "Engineering Drawing for Cameroon Students", author: "Ngwa Patrick", category: "Mechanical Engineering" },
        { id: "FET-002", title: "Programming Fundamentals with JavaScript", author: "Manga Rose", category: "Software Engineering" },
        { id: "FET-003", title: "Power Systems and Electrical Machines", author: "Tchaptchet Emmanuel", category: "Electrical Engineering" },
        { id: "FET-004", title: "Construction Materials and Site Practice", author: "Nfor Linda", category: "Civil Engineering" },
        { id: "FET-005", title: "Telecommunications Networks in Cameroon", author: "Biyong Alain", category: "Telecommunications" }
    ];

    // Load from localStorage if exists
    const storedBooks = localStorage.getItem('fet_books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }

    // Render books to table
    function renderBooks(filter = "") {
        const $bookList = $('#book-list');
        $bookList.empty();
        
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredBooks.length === 0) {
            $('#no-results').show();
            $('#book-table').hide();
        } else {
            $('#no-results').hide();
            $('#book-table').show();
            
            filteredBooks.forEach((book, index) => {
                const actualIndex = books.indexOf(book);
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
            });
        }
        
        $('#book-count').text(`Total Books: ${books.length}`);
        localStorage.setItem('fet_books', JSON.stringify(books));
    }

    // Add / Update Book
    $('#book-form').on('submit', function(e) {
        e.preventDefault();
        
        const editIndex = parseInt($('#edit-index').val());
        const id = $('#book-id').val().trim();
        const title = $('#book-title').val().trim();
        const author = $('#book-author').val().trim();
        const category = $('#book-category').val();

        // Validation: Duplicate ID check (only if not editing or if ID changed)
        const isDuplicate = books.some((book, index) => book.id === id && index !== editIndex);
        if (isDuplicate) {
            alert("Error: A book with this ID already exists in the system.");
            return;
        }

        const bookData = { id, title, author, category };

        if (editIndex === -1) {
            // Create
            books.push(bookData);
        } else {
            // Update
            books[editIndex] = bookData;
            resetForm();
        }

        renderBooks();
        this.reset();
    });

    // Edit Book
    $(document).on('click', '.btn-edit', function() {
        const index = $(this).data('index');
        const book = books[index];

        $('#form-title').text('Edit Book');
        $('#submit-btn').text('Update Book');
        $('#cancel-btn').show();
        $('#edit-index').val(index);
        
        $('#book-id').val(book.id);
        $('#book-title').val(book.title);
        $('#book-author').val(book.author);
        $('#book-category').val(book.category);
        
        // Scroll to form
        $('html, body').animate({
            scrollTop: $(".card").offset().top - 120
        }, 500);
    });

    // Delete Book
    $(document).on('click', '.btn-delete', function() {
        if (confirm("Are you sure you want to remove this book from the catalog?")) {
            const index = $(this).data('index');
            books.splice(index, 1);
            renderBooks();
        }
    });

    // Search functionality
    $('#search-input').on('keyup', function() {
        renderBooks($(this).val());
    });

    // Cancel Edit
    $('#cancel-btn').on('click', function() {
        resetForm();
    });

    function resetForm() {
        $('#form-title').text('Register Book');
        $('#submit-btn').text('Add Book to Catalog');
        $('#cancel-btn').hide();
        $('#edit-index').val('-1');
        $('#book-form')[0].reset();
    }

    // Smooth scroll for landing page
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Initial render
    renderBooks();
});
