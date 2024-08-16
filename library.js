const addBookBtn = document.querySelector('.add-book-button');
const formModal = document.getElementById('formModal');
const bookForm = document.getElementById('bookForm');
const closeFormBtn = document.querySelector('.modal__button--close');

const myLibrary = [
  {
    author: 'J. K. Rowling',
    title: 'Harry Potter and the Prisoner of Azkaban',
    pages: '317',
    isReadStatus: true,
  },
  {
    author: 'J.R.R. Tolkien',
    title: 'The Fellowship of the Ring',
    pages: '417',
    isReadStatus: false,
  },
  {
    author: 'Frank Herbert',
    title: 'Dune',
    pages: '412',
    isReadStatus: true,
  },
];

// Book object constructor

function Book(author, title, pages, isReadStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isReadStatus = isReadStatus;
}

// Handles displaying the book form

function showFormModal() {
  formModal.classList.add('active');
}

function hideFormModal() {
  formModal.classList.remove('active');
  clearFormErrors();
  bookForm.reset();
}

// Removes errors from the form

function clearFormErrors() {
  const authorInput = document.getElementById('author');
  const titleInput = document.getElementById('title');
  authorInput.classList.remove('input-error');
  titleInput.classList.remove('input-error');
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

// Handles book submission

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const authorInput = document.getElementById('author');
  const titleInput = document.getElementById('title');
  const pagesInput = document.getElementById('pages');

  const author = authorInput.value.trim();
  const title = titleInput.value.trim();
  const pages = pagesInput.value.trim();
  const isReadStatus = document.getElementById('read').checked;

  // Handles empty required input fielnds

  let isValid = true;

  if (!author) {
    authorInput.classList.add('input-error');
    isValid = false;
  }

  if (!title) {
    titleInput.classList.add('input-error');
    isValid = false;
  }

  if (isValid) {
    addBookToLibrary(author, title, pages, isReadStatus);
    hideFormModal();
    bookForm.reset();
  }
});

// Handles adding individual book to the book library

function addBookToLibrary(author, title, pages, isReadStatus) {
  myLibrary.push(new Book(author, title, pages, isReadStatus));

  displayBooks();
}

// Displays submitted book inside myLibrary as a table on the page

function displayBooks() {
  const booksTableBody = document
    .getElementById('booksTable')
    .querySelector('tbody');

  booksTableBody.innerHTML = '';

  // Loops through books object and generates table content

  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const removalCell = document.createElement('td');

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = !book.pages ? '' : `${book.pages} pages`;

    // Setup for status button

    const statusButton = document.createElement('button');
    statusButton.textContent = book.isReadStatus ? 'Read' : 'Not Read';
    statusButton.className = book.isReadStatus
      ? 'status-button-read'
      : 'status-button-not-read';

    // Toggle that lets user change if the book was read or not

    statusButton.addEventListener('click', () => {
      book.isReadStatus = !book.isReadStatus;
      statusButton.textContent = book.isReadStatus ? 'Read' : 'Not Read';
      statusButton.className = book.isReadStatus
        ? 'status-button-read'
        : 'status-button-not-read';
    });

    statusCell.appendChild(statusButton);

    // Removes book from library

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayBooks();
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
