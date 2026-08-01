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
        const bookEntryWrapper = document.createElement('div');
        bookEntryWrapper.classList.add('book-card');

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-card-info');

        const title = document.createElement('p');
        title.classList.add('book-card-title');
        title.textContent = `Book title: ${book.title}`;

        const author = document.createElement('p');
        author.classList.add('book-card-author');
        author.textContent = `Book author: ${book.author}`;

        const pages = document.createElement('p');
        pages.classList.add('book-card-pages');
        pages.textContent = `Number of pages: ${book.numOfPages}`;

        const status = document.createElement('p');
        status.classList.add('book-card-status');
        status.textContent = book.haveRead ? 'Status: Have read' : 'Status: Have not read';

        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);
        bookInfo.appendChild(status);

        bookEntryWrapper.appendChild(bookInfo);
        mainWrapper.appendChild(bookEntryWrapper);
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