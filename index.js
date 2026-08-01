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
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.bookId = book.bookId;

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-card-info');

        const cardButtonWrapper = document.createElement('div');
        cardButtonWrapper.classList.add('book-card-btn-wrapper');

        const cardButtonDelete = document.createElement('button');
        cardButtonDelete.classList.add('book-card-delete');
        cardButtonDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

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
        
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(cardButtonWrapper)
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
    const deleteBtn = e.target.closest('.book-card-delete');
    if (!deleteBtn) return;

    const bookCard = deleteBtn.closest('.book-card');
    const bookId = bookCard.dataset.bookId;

    const index = myLibrary.findIndex(b => b.bookId === bookId);
    myLibrary.splice(index, 1);
    displayLibraryBooks();
});