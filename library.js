const addBookBtn = document.querySelector('.add-book-button');
const formModal = document.getElementById('formModal');
const closeFormBtn = document.querySelector('.modal__button--close');

const myLibrary = [
  {
    author: 'Filip',
    title: 'harry potter',
    pages: '22',
    isRead: false,
  },
  {
    author: 'John',
    title: 'lord of the rings',
    pages: '99',
    isRead: true,
  },
  {
    author: 'Tom',
    title: 'Dune',
    pages: '65',
    isRead: false,
  },
];

// Book constructor

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

// Handles adding individual book to the book library

function addBookToLibrary(author, title, pages, readCheckbox) {
  const isRead = readCheckbox.checked;

  myLibrary.push(new Book(author, title, pages, isRead));
  console.log(myLibrary);
  displayBooks();
}

console.log(myLibrary);

// Handles book submission

document.getElementById('bookForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('pages').value;
  const readCheckbox = document.getElementById('read');

  addBookToLibrary(author, title, pages, readCheckbox);

  hideFormModal();
});

// Handles displaying the book form

function showFormModal() {
  document.getElementById('formModal').style.display = 'flex';
}

function hideFormModal() {
  document.getElementById('formModal').style.display = 'none';
}

addBookBtn.addEventListener('click', () => {
  showFormModal();
});

closeFormBtn.addEventListener('click', () => {
  hideFormModal();
});

// Hides form modal if the user clicks outside of modal interface

document.getElementById('formModal').addEventListener('click', (event) => {
  if (event.target === document.getElementById('formModal')) {
    hideFormModal();
  }
});

// Displays submitted book inside myLibrary as a table on the page

function displayBooks() {
  const booksTableBody = document
    .getElementById('booksTable')
    .querySelector('tbody');

  booksTableBody.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const removalCell = document.createElement('td');

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = `${book.pages} pages`;

    const statusButton = document.createElement('button');
    statusButton.textContent = book.isRead ? 'Read' : 'Not Read';
    statusButton.className = book.isRead
      ? 'status-button-read'
      : 'status-button-not-read';

    // User can change read status

    statusButton.addEventListener('click', () => {
      book.isRead = !book.isRead;
      statusButton.textContent = book.isRead ? 'Read' : 'Not Read';
      statusButton.className = book.isRead
        ? 'status-button-read'
        : 'status-button-not-read';
      console.log(myLibrary);
    });

    statusCell.appendChild(statusButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
      console.log(myLibrary);
    });

    removalCell.appendChild(removeButton);

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(statusCell);
    row.appendChild(removalCell);

    booksTableBody.appendChild(row);
  });
}

displayBooks();
