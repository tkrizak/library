const booksContainer = document.querySelector('.books-container');

const myLibrary = [
  {
    author: 'Fil',
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

// Handles adding individual book object to the library

function addBookToLibrary(author, title, pages) {
  myLibrary.push(new Book(author, title, pages));
  console.log(myLibrary);
  displayBooks();
}

console.log(myLibrary);

// Displays books inside myLibrary on the page

function displayBooks() {
  // Clear current book list to prevent duplication
  booksContainer.innerHTML = '';

  myLibrary.forEach((book) => {
    // Create elements for each book
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    const bookAuthor = document.createElement('p');
    const bookTitle = document.createElement('p');
    const bookPages = document.createElement('p');

    // Give each book text
    bookAuthor.textContent = book.author;
    bookTitle.textContent = book.title;
    bookPages.textContent = book.pages;

    // Add correct elements to correct DOM node
    booksContainer.appendChild(bookDiv);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookPages);
  });
}

displayBooks();

// Book submission

document.getElementById('bookForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('pages').value;

  addBookToLibrary(author, title, pages);
});
