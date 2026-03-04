
let books = JSON.parse(localStorage.getItem('books')) || [];


document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
    
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', uploadBook);
    }

    const bookCover = document.getElementById('bookCover');
    if (bookCover) {
        bookCover.addEventListener('change', function(e) {
            previewImage(e, 'coverPreview');
        });
    }
});


function displayBooks() {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;

    let booksToDisplay = books;

  
    const searchBooks = document.getElementById('searchBooks');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchBooks && categoryFilter) {
        const searchTerm = searchBooks.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        booksToDisplay = books.filter(book => {
            const matchSearch = book.title.toLowerCase().includes(searchTerm) || 
                              book.author.toLowerCase().includes(searchTerm);
            const matchCategory = !selectedCategory || book.category === selectedCategory;
            return matchSearch && matchCategory;
        });
    }

    if (booksToDisplay.length === 0) {
        booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No books found. Try a different search or upload a new book!</p>';
        return;
    }

    booksGrid.innerHTML = booksToDisplay.map((book, index) => {
        const originalIndex = books.indexOf(book);
        return `
        <div class="book-card">
            ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="book-cover">` : `<div class="book-cover">📕</div>`}
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <p class="book-description">${book.description}</p>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="downloadBook(${originalIndex})">📥 Download</button>
                    <button class="btn btn-secondary" onclick="viewBookDetails(${originalIndex})">View Details</button>
                    <button class="delete-btn" onclick="deleteBook(${originalIndex})">Delete</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}


function filterBooks() {
    displayBooks();
}


function uploadBook(e) {
    e.preventDefault();

    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookCategory = document.getElementById('bookCategory').value;
    const bookDescription = document.getElementById('bookDescription').value;
    const bookDocumentInput = document.getElementById('bookDocument');
    const bookCoverInput = document.getElementById('bookCover');

    if (bookDocumentInput.files.length === 0) {
        showAlert('Please select a document to upload', 'error');
        return;
    }

    const docReader = new FileReader();
    docReader.onload = function(docEvent) {
        let bookCover = null;

        if (bookCoverInput.files.length > 0) {
            const coverReader = new FileReader();
            coverReader.onload = function(coverEvent) {
                bookCover = coverEvent.target.result;
                saveBook(bookTitle, bookAuthor, bookCategory, bookDescription, docEvent.target.result, bookCover);
            };
            coverReader.readAsDataURL(bookCoverInput.files[0]);
        } else {
            saveBook(bookTitle, bookAuthor, bookCategory, bookDescription, docEvent.target.result, null);
        }
    };
    docReader.readAsArrayBuffer(bookDocumentInput.files[0]);
}

function saveBook(title, author, category, description, document, cover) {
    const newBook = {
        title: title,
        author: author,
        category: category,
        description: description,
        document: document,
        cover: cover,
        dateUploaded: new Date().toLocaleDateString()
    };

    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    document.getElementById('uploadForm').reset();
    document.getElementById('coverPreview').classList.remove('show');
    closeUploadModal();
    displayBooks();

    showAlert(`Book "${title}" uploaded successfully!`, 'success');
}


function deleteBook(index) {
    if (confirm('Are you sure you want to delete this book?')) {
        const bookTitle = books[index].title;
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        showAlert(`Book "${bookTitle}" deleted successfully!`, 'success');
    }
}


function downloadBook(index) {
    const book = books[index];
    if (book.document) {
        const link = document.createElement('a');
        link.href = book.document;
        link.download = `${book.title}.pdf`;
        link.click();
    }
}


function viewBookDetails(index) {
    const book = books[index];
    alert(`
Title: ${book.title}
Author: ${book.author}
Category: ${book.category}
Description: ${book.description}
Date Uploaded: ${book.dateUploaded}
    `);
}

function openUploadModal() {
    document.getElementById('uploadModal').classList.add('show');
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('show');
}


window.addEventListener('click', function(event) {
    const uploadModal = document.getElementById('uploadModal');
    if (event.target === uploadModal) {
        closeUploadModal();
    }
});

function previewImage(event, previewElementId) {
    const file = event.target.files[0];
    const preview = document.getElementById(previewElementId);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}


function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${type}`;
    alertDiv.textContent = message;
    
    const librarySection = document.querySelector('.library-section');
    if (librarySection) {
        librarySection.insertBefore(alertDiv, librarySection.firstChild);
    }

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
