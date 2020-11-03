// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() { }

// Add Book to List
UI.prototype.addBookToList = function (book) {
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
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
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
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

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

      // Show success
      ui.showAlert('Book Added!', 'success');

      // Clear fields
      ui.clearFields();
    }
  });

  // Event listeners for delete
  document.getElementById('book-list').addEventListener('click', function(e){
    e.preventDefault();
    console.log('test');
  })