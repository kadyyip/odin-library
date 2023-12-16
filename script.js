class Library {
    constructor() {
        this._library = [];
    }

    addBook(book) {
        this._library.push(book);
    }

    getBook(index) {
        return this._library[index];
    }

    removeBook(index) {
        this._library.pop(index);
    }

    getLibrary() {
        return this._library;
    }
}

class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }

    changeReadStatus() {
        this.read = !this.read
    }
}

// DOM SELECTORS
const readBooks = document.querySelector('.read-books');
const notReadBooks = document.querySelector('.not-read-books');
const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector("dialog .close");
const form = document.querySelector("form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#read");
const errorMsg = document.querySelector(".error-msg");

function displayBooks() {
    for (let i = 0; i < myLibrary.getLibrary().length; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-index', i);
        addRemoveButton(bookDiv);
        addBookInfo(bookDiv);
        addReadStatusButton(bookDiv);
    }
}

function addRemoveButton(bookDiv) {
    const removeButton = document.createElement('button');
    removeButton.classList.add("close")
    removeButton.textContent = "×";
    removeButton.addEventListener("click", () => {
        myLibrary.removeBook(bookDiv.dataset.index);
        render();
    });
    bookDiv.appendChild(removeButton);
}

function addReadStatusButton(bookDiv) {
    const myBook = myLibrary.getBook(bookDiv.dataset.index);
    const readStatusButton = document.createElement('button');
    readStatusButton.classList.add("move");
    readStatusButton.addEventListener("click", (event) => {
        myBook.changeReadStatus();
        render();
    });
    if (myBook.read) {
        readBooks.appendChild(bookDiv);
        readStatusButton.textContent = "Move to To Read";
    }
    else {
        notReadBooks.appendChild(bookDiv);
        readStatusButton.textContent = "Move to Completed";
    }
    bookDiv.appendChild(readStatusButton);
}

function addBookInfo(bookDiv) {
    const myBook = myLibrary.getBook(bookDiv.dataset.index);
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    bookDiv.appendChild(bookInfo);
    for (let prop in myBook) {
        if (prop != "read") {
            const propDiv = document.createElement('div');
            propDiv.classList.add(prop);
            propDiv.textContent = `${capitalize(prop)}: ${myBook[prop]}`;
            bookInfo.appendChild(propDiv);
        }
    }
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function clearBooks() {
    while (readBooks.firstChild) {
        readBooks.removeChild(readBooks.lastChild);
    }
    while (notReadBooks.firstChild) {
        notReadBooks.removeChild(notReadBooks.lastChild);
    }
}

function render() {
    clearBooks();
    displayBooks();
}

// EVENT LISTENERS
// open dialog when button is pressed
newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// close the dialog when button is pressed
closeButton.addEventListener("click", () => {
    dialog.close();
});

// add book to library when button is pressed
addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    // check if all required fields are filled in and display error if not
    if (!(formTitle.value && formAuthor.value && formPages.value)) {
        if (errorMsg.textContent === "") {
            errorMsg.textContent = "Please fill in required fields!"
            form.prepend(errorMsg);
        }
    }
    else {
        if (errorMsg !== null) {
            errorMsg.textContent = "";
        }
        const book = new Book(formTitle.value, formAuthor.value, 
            formPages.value, formRead.checked);
        form.reset();
        dialog.close();
        myLibrary.addBook(book);
        render();
    }
});

const myLibrary = new Library();