const myLibrary = [];

function Book(bookId,title, author, numOfPages, haveRead) {
    this.bookId = bookId
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
}

Book.prototype.toggleStatus = function() {
    this.haveRead = !this.haveRead;
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
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.bookId = book.bookId;

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-card-info');

        const cardButtonWrapper = document.createElement('div');
        cardButtonWrapper.classList.add('book-card-btn-wrapper');

        const cardButtonDelete = document.createElement('button');
        cardButtonDelete.classList.add('book-card-delete-btn');
        cardButtonDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

        const cardButtonStatus = document.createElement('button');
        cardButtonStatus.classList.add('book-card-status-btn');
        cardButtonStatus.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18"><title>book-open-blank-variant-outline</title><path d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M11 7.5C9.64 6.9 7.84 6.5 6.5 6.5C5.3 6.5 4.1 6.65 3 7V18.5C4.1 18.15 5.3 18 6.5 18C7.84 18 9.64 18.4 11 19V7.5M13 19C14.36 18.4 16.16 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C16.16 6.5 14.36 6.9 13 7.5V19Z" /></svg>`;

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
        cardButtonWrapper.appendChild(cardButtonDelete);
        cardButtonWrapper.appendChild(cardButtonStatus);
        
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(cardButtonWrapper);
        mainWrapper.appendChild(bookCard);
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

mainWrapper.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.book-card-delete-btn');
    if (deleteBtn) {
        const bookCard = deleteBtn.closest('.book-card');
        const index = myLibrary.findIndex(b => b.bookId === bookCard.dataset.bookId);
        myLibrary.splice(index, 1);
        displayLibraryBooks();
        return;
    }

    const statusBtn = e.target.closest('.book-card-status-btn');
    if (statusBtn) {
        const bookCard = statusBtn.closest('.book-card');
        const book = myLibrary.find(b => b.bookId === bookCard.dataset.bookId);
        book.toggleStatus();
        displayLibraryBooks();
        return;
    }
});