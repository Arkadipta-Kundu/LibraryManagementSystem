// LocalStorage keys
const BOOKS_KEY = 'books';
const USERS_KEY = 'users';
const BORROWED_KEY = 'borrowedBooks';

// Helper to get data from LocalStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Helper to set data to LocalStorage
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userType = document.getElementById('userType').value;
    window.location.href = userType === 'reader' ? 'reader.html' : 'librarian.html';
});

// Reader - Search Books
document.getElementById('searchBook')?.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const books = getData(BOOKS_KEY);
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books
        .filter(book => book.title.toLowerCase().includes(query))
        .forEach(book => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${book.title} by ${book.author}`;
            bookList.appendChild(li);
        });
});

// Librarian - Add Books
document.getElementById('bookForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;

    const books = getData(BOOKS_KEY);
    books.push({ title: bookTitle, author: bookAuthor });
    setData(BOOKS_KEY, books);

    displayBooks();
});

// Librarian - Display Books
function displayBooks() {
    const books = getData(BOOKS_KEY);
    const bookInventory = document.getElementById('bookInventory');
    bookInventory.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${book.title} by ${book.author}`;
        bookInventory.appendChild(li);
    });
}

// On page load (librarian.html)
if (window.location.pathname.includes('librarian.html')) {
    displayBooks();
}

// Add similar functionality for managing users, borrowed books, etc.
