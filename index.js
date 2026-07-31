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
        bookEntry.textContent = `${book.title} by ${book.author} — ${book.numOfPages} pages — ${book.haveRead ? 'Read' : 'Not read yet'}`;
        mainWrapper.appendChild(bookEntry);
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Pragmatic Programmer", "David Thomas", 352, true);

displayLibraryBooks();