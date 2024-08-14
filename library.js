const booksGrid = document.querySelector('.books__grid');
const addBookBtn = document.querySelector('.add-book-button');
const formModal = document.getElementById('form-modal');
const closeFormBtn = document.querySelector('.modal__button--close');

const myLibrary = [
  {
    author: 'Filip',
    title: 'harry potter',
    pages: '22',
  },
  {
    author: 'John',
    title: 'lord of the rings',
    pages: '99',
  },
  {
    author: 'Tom',
    title: 'Dune',
    pages: '65',
  },
];

// Book constructor

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
}

// Handles adding individual book to the book library

function addBookToLibrary(author, title, pages) {
  myLibrary.push(new Book(author, title, pages));
  console.log(myLibrary);
  displayBooks();
}

console.log(myLibrary);

// Handles displaying the book form

function showFormModal() {
  document.getElementById('form-modal').style.display = 'flex';
}

function hideFormModal() {
  document.getElementById('form-modal').style.display = 'none';
}

addBookBtn.addEventListener('click', () => {
  showFormModal();
});

closeFormBtn.addEventListener('click', () => {
  hideFormModal();
});

// Hides form modal if the user clicks outside of modal interface

document.getElementById('form-modal').addEventListener('click', (event) => {
  if (event.target === document.getElementById('form-modal')) {
    hideFormModal();
  }
});

// Handles book submission

document.getElementById('book-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('pages').value;

  addBookToLibrary(author, title, pages);

  hideFormModal();
});

// Displays submitted book inside myLibrary on the page

function displayBooks() {
  // Clear current book list to prevent book duplication
  booksGrid.innerHTML = '';

  myLibrary.forEach((book) => {
    // Create elements for each book
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    const bookAuthor = document.createElement('p');
    const bookTitle = document.createElement('p');
    const bookPages = document.createElement('p');

    // Give each book correct text
    bookAuthor.textContent = book.author;
    bookTitle.textContent = book.title;
    bookPages.textContent = `${book.pages} pages`;

    // Add correct elements to correct DOM node
    booksGrid.appendChild(bookDiv);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookPages);
  });
}

displayBooks();
