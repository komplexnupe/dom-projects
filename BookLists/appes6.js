class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create TR element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row)
  }

  showAlert(message, className) {
    // Create a <div>
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get a parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    // Insert before
    container.insertBefore(div, form);
    // Timeout
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
  }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null){
       books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books
  }
  static displayBooks() {
    const books = Store.getBooks();
    
    books.forEach(book => {
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }
  
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook() {

  }
}

// DOM load (on load)
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event Listeners for Add
document.getElementById('book-form').addEventListener('submit',
  function (e) {
    e.preventDefault();
    // console.log('test');
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add book to list
      ui.addBookToList(book);

      // Add to LS
      Store.addBook(book);

      // Show success
      ui.showAlert('Book Added!', 'success');

      // Clear fields
      ui.clearFields();
    }
  });

  // Event listeners for delete
  document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();
    
    // Instantiate UI
    const ui = new UI();

    // Delete target
    ui.deleteBook(e.target);

     // Show success
     ui.showAlert('Book Removed!', 'success');
  })