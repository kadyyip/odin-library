const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    clearBooks();
    for (let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement('div');
        book.classList.add('book');
        book.setAttribute('data-index', i);
        addRemoveButton(book);
        addBookInfo(book);
        addReadStatusButton(book);
    }
}

function clearBooks() {
    const read = document.querySelector('.read-books');
    const notRead = document.querySelector('.not-read-books');
    while (read.firstChild) {
        read.removeChild(read.lastChild);
    }
    while (notRead.firstChild) {
        notRead.removeChild(notRead.lastChild);
    }
}

function addRemoveButton(book) {
    const removeButton = document.createElement('button');
    removeButton.classList.add("close")
    removeButton.textContent = "×";
    removeButton.addEventListener("click", () => {
        myLibrary.pop(book.dataset.index);
        displayBooks();
    });
    book.appendChild(removeButton);
}

function addBookInfo(book) {
    const myBook = myLibrary[book.dataset.index];
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    book.appendChild(bookInfo);
    for (let prop in myBook) {
        if (prop != "read") {
            const propDiv = document.createElement('div');
            propDiv.classList.add(prop);
            propDiv.textContent = `${capitalize(prop)}: ${myBook[prop]}`;
            bookInfo.appendChild(propDiv);
        }
    }
}

function addReadStatusButton(book) {
    const read = document.querySelector('.read-books');
    const notRead = document.querySelector('.not-read-books');
    const myBook = myLibrary[book.dataset.index];
    const readStatusButton = document.createElement('button');
    readStatusButton.classList.add("move");
    readStatusButton.addEventListener("click", (event) => {
        myLibrary[book.dataset.index].read = !myLibrary[book.dataset.index].read;
        displayBooks();
    });
    if (myBook.read) {
        read.appendChild(book);
        readStatusButton.textContent = "Move to To Read";
    }
    else {
        notRead.appendChild(book);
        readStatusButton.textContent = "Move to Completed";
    }
    book.appendChild(readStatusButton);
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector("dialog .close");

// open dialog when button is pressed
newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// add book to library when button is pressed
addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    // check if all required fields are filled in and display error if not
    if (!(title && author && pages)) {
        const errorMsg = document.querySelector(".error-msg");
        if (errorMsg === null) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('error-msg');
            errorMsg.textContent = "Please fill in required fields!"
            form.prepend(errorMsg);
        }
    }

    else {
        const errorMsg = document.querySelector(".error-msg");
        if (errorMsg !== null) {
            errorMsg.remove();
        }
        const book = new Book(title, author, pages, read);
        form.reset();
        dialog.close();
        addBookToLibrary(book);
        displayBooks(book);
    }
});

// close the dialog when button is pressed
closeButton.addEventListener("click", () => {
    dialog.close();
});