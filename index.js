const myLibrary = [];

function Book(bookId,title, author, numOfPages, haveRead) {
    this.bookId = bookId
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, numOfPages, haveRead) {
    const bookId = crypto.randomUUID();
    const newBook = new Book(bookId, title, author, numOfPages, haveRead);
    myLibrary.push(newBook);
}

const mainWrapper = document.querySelector('.main-wrapper');

function displayLibraryBooks() {
    mainWrapper.innerHTML = '';

    myLibrary.forEach(book => {
        const bookEntry = document.createElement('p');
        bookEntry.textContent = `${book.title} by ${book.author} — ${book.numOfPages} pages — ${book.haveRead ? 'Have read' : 'Have not read'}`;
        mainWrapper.appendChild(bookEntry);
    });
}

const addBookBtn = document.getElementById('addBookBtn');

addBookBtn.addEventListener('click', () => {
    const author = document.getElementById('author').value;
    const title = document.getElementById('bookTitle').value;
    const pages = document.getElementById('bookPages').value;
    const haveRead = document.querySelector('input[name="haveRead"]:checked').value === 'Yes';

    if (!author || !title || !pages) return;

    addBookToLibrary(title, author, pages, haveRead);
    displayLibraryBooks();

    document.getElementById('newBookForm').reset();
    document.getElementById('newBook').close();
})