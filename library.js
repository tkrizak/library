const addBookBtn = document.querySelector('.add-book-button');
const formModal = document.getElementById('formModal');
const bookForm = document.getElementById('bookForm');
const closeFormBtn = document.querySelector('.modal__button--close');

const myLibrary = [
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J. K. Rowling',
    pages: '317',
    isReadStatus: true,
  },
  {
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    pages: '417',
    isReadStatus: false,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    pages: '412',
    isReadStatus: true,
  },
];

// Book object constructor

function Book(title, author, pages, isReadStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isReadStatus = isReadStatus;
}

// Handles displaying the book form

function showFormModal() {
  formModal.classList.add('active');
  document.getElementById('title').focus();
}

function hideFormModal() {
  formModal.classList.remove('active');
  clearFormErrors();
  bookForm.reset();
}

// Removes errors from the form

function clearFormErrors() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
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

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = pagesInput.value.trim();
  const isReadStatus = document.getElementById('read').checked;

  // Handles validation for required input fields

  let isValid;

  if (!title) {
    titleInput.classList.add('input-error');
    isValid = false;
  } else {
    titleInput.classList.remove('input-error');
    isValid = true;
  }

  if (!author) {
    authorInput.classList.add('input-error');
    isValid = false;
  } else {
    authorInput.classList.remove('input-error');
    isValid = true;
  }

  // Focuses cursor on the first invalid input

  if (!title) {
    titleInput.focus();
  } else if (!author) {
    authorInput.focus();
  }

  // Submits the form if all inputs are valid

  if (isValid) {
    addBookToLibrary(title, author, pages, isReadStatus);
    hideFormModal();
    bookForm.reset();
  }
});

// Handles adding individual book to the book library

function addBookToLibrary(title, author, pages, isReadStatus) {
  myLibrary.push(new Book(title, author, pages, isReadStatus));

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
