const addBookBtn = document.querySelector('.add-book-button');
const formModal = document.getElementById('formModal');
const bookForm = document.getElementById('bookForm');
const closeFormBtn = document.querySelector('.modal__button--close');

// Book class definition
class Book {
  constructor(title, author, pages, isReadStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isReadStatus = isReadStatus;
  }

  toggleReadStatus() {
    this.isReadStatus = !this.isReadStatus;
  }
}

// Library class definition
class Library {
  constructor(books = []) {
    this.books = books;
  }

  static createInitialBooks() {
    return new Library([
      new Book(
        'Harry Potter and the Prisoner of Azkaban',
        'J. K. Rowling',
        '317',
        true
      ),
      new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '417', false),
      new Book('Dune', 'Frank Herbert', '412', true),
    ]);
  }

  addBook(book) {
    this.books.push(book);
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.displayBooks();
  }

  displayBooks() {
    const booksTableBody = document
      .getElementById('booksTable')
      .querySelector('tbody');

    booksTableBody.innerHTML = '';

    this.books.forEach((book, index) => {
      const row = document.createElement('tr');

      const titleCell = document.createElement('td');
      const authorCell = document.createElement('td');
      const pagesCell = document.createElement('td');
      const statusCell = document.createElement('td');
      const removalCell = document.createElement('td');

      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      pagesCell.textContent = !book.pages ? '' : `${book.pages} pages`;

      const statusButton = document.createElement('button');
      statusButton.textContent = book.isReadStatus ? 'Read' : 'Not Read';
      statusButton.className = book.isReadStatus
        ? 'status-button-read'
        : 'status-button-not-read';

      statusButton.addEventListener('click', () => {
        book.toggleReadStatus();
        statusButton.textContent = book.isReadStatus ? 'Read' : 'Not Read';
        statusButton.className = book.isReadStatus
          ? 'status-button-read'
          : 'status-button-not-read';
      });

      statusCell.appendChild(statusButton);

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
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
}

// Create a library with the initial books
const myLibrary = Library.createInitialBooks();

// Display initial books in the library
myLibrary.displayBooks();

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

// Event listeners
addBookBtn.addEventListener('click', showFormModal);
closeFormBtn.addEventListener('click', hideFormModal);

// Hides form modal if the user clicks outside of modal interface
formModal.addEventListener('click', (event) => {
  if (event.target === formModal) {
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
  let isValid = true;

  if (!title) {
    titleInput.classList.add('input-error');
    isValid = false;
  } else {
    titleInput.classList.remove('input-error');
  }

  if (!author) {
    authorInput.classList.add('input-error');
    isValid = false;
  } else {
    authorInput.classList.remove('input-error');
  }

  // Focuses cursor on the first invalid input
  if (!title) {
    titleInput.focus();
  } else if (!author) {
    authorInput.focus();
  }

  // Submits the form if all inputs are valid
  if (isValid) {
    const newBook = new Book(title, author, pages, isReadStatus);
    myLibrary.addBook(newBook);
    hideFormModal();
    bookForm.reset();
  }
});
