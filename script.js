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
    const read = document.querySelector('.read-books');
    const notRead = document.querySelector('.not-read-books');
    while (read.firstChild) {
        read.removeChild(read.lastChild);
    }
    while (notRead.firstChild) {
        notRead.removeChild(notRead.lastChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        // create book
        const myBook = myLibrary[i];
        const book = document.createElement('div');
        
        book.classList.add('book');
        book.setAttribute('data-index', i);
        const removeButton = document.createElement('button');
        removeButton.classList.add("close")
        removeButton.textContent = "×";
        removeButton.addEventListener("click", (event) => {
            console.log(book.dataset.index);
            myLibrary.pop(book.dataset.index);
            displayBooks();
        });
        book.appendChild(removeButton);
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
        const readButton = document.createElement('button');
        readButton.classList.add("move");
        readButton.addEventListener("click", (event) => {
            myLibrary[book.dataset.index].read = !myLibrary[book.dataset.index].read;
            displayBooks();
        });
        if (myBook.read) {
            read.appendChild(book);
            readButton.textContent = "Move to To Read";
        }
        else {
            notRead.appendChild(book);
            readButton.textContent = "Move to Completed";
        }
        book.appendChild(readButton);
    }
}

function createBookHmtl(book) {
    
}


function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector(".new-book");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector("dialog .close");


let book1 = new Book("Pride and Prejudice", "Jane Austen", 300, true);
let book2 = new Book("Emma", "Jane Austen", 200, false); 

addBookToLibrary(book1);
addBookToLibrary(book2);
displayBooks();

// "Show the dialog" button opens the dialog modally
newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Add book" button adds book to library closes the dialog
addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    if (!(title && author && pages)) {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-msg');
        errorMsg.textContent = "Please fill in required fields!"
        form.prepend(errorMsg);
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

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});

