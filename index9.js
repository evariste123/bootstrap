// Store for our books
let books = [];

/**
 * MODAL CONTROLS
 */
function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('uploadForm').reset();
}

/**
 * RENDER BOOKS TO GRID
 */
function displayBooks(filterData = books) {
    const grid = document.getElementById('booksGrid');
    
    if (filterData.length === 0) {
        grid.innerHTML = '<p>No books found matching your criteria.</p>';
        return;
    }

    grid.innerHTML = filterData.map((book, index) => `
        <div class="book-card" style="border:1px solid #ccc; padding:15px; border-radius:8px; margin-bottom:10px;">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p>${book.description}</p>
            <small>File: ${book.fileName}</small>
        </div>
    `).join('');
}

/**
 * SEARCH & FILTER LOGIC
 */
function filterBooks() {
    const searchTerm = document.getElementById('searchBooks').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                              book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "" || book.category === category;
        return matchesSearch && matchesCategory;
    });

    displayBooks(filtered);
}

/**
 * FORM SUBMISSION (UPLOAD)
 */
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Create book object
    const newBook = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        category: document.getElementById('bookCategory').value,
        description: document.getElementById('bookDescription').value,
        fileName: document.getElementById('bookDocument').files[0]?.name || 'No file',
        id: Date.now()
    };

    // Add to array
    books.push(newBook);
    
    // Refresh UI
    displayBooks();
    closeUploadModal();
    alert("Book uploaded successfully!");
});

/**
 * SEARCH FORM SUBMIT
 */
document.querySelector('form[action=""]').addEventListener('submit', function(e) {
    e.preventDefault();
    filterBooks();
});

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('uploadModal');
    if (event.target == modal) closeUploadModal();
};

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search');
    const searchInput = document.getElementById('searchBooks');

    searchForm.addEventListener('submit', (e) => {
        // 1. Prevent the page from reloading
        e.preventDefault();

        // 2. Get the search term
        const query = searchInput.value.trim().toLowerCase();

        if (!query) return;

        // 3. Logic to filter your books (Example)
        console.log(`Searching for: ${query}`);
        
        // This targets your book cards or list items
        const bookCards = document.querySelectorAll('.book-card'); 

        bookCards.forEach(card => {
            const title = card.innerText.toLowerCase();
            if (title.includes(query)) {
                card.style.display = "block"; // Show match
            } else {
                card.style.display = "none";  // Hide others
            }
        });
    });

    // Optional: Real-time search as you type
    searchInput.addEventListener('input', () => {
        if (searchInput.value === "") {
            // Show all books if search is cleared
            document.querySelectorAll('.book-card').forEach(card => card.style.display = "block");
        }
    });
});
