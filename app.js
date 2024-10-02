// Classes

// Book class : Represents a book

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn; 
    }
}


// UI class : Handles UI tasks

class UI{
    static displayBooks(){
       
        // Get saved books from local storage
        const books = Store.getBooks()

        books.forEach((book) => UI.addBookToList(book));
    }

    // create item rows
    static addBookToList(book){
        
        // get table body
        const list = document.querySelector('#book-list');

        // create row
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
        
    }

    // delete item rows
    static deleteBook(click){
        // check if clicked element has delete class
        if(click.classList.contains('delete')){
             
            // specify element to delete
            // <tr><td><td></tr>
            click.parentElement.parentElement.remove();

            // Show deleted message
            UI.showAlert('Book Removed!', 'info');
        }
    }

    // display alert message
    static showAlert(message, className){

        // create a div 
        const div = document.createElement('div');

        // set class for div
        div.className = `alert alert-${className}`;

        // set message as text for div
        div.appendChild(document.createTextNode(message));

        // locate container and form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        // insert div inside container before form
        container.insertBefore(div, form);

        // disappear in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)

    }

    // clear fields
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

// Store class : Handles storage

class Store {

    // 3 methods: getBooks, addBook, removeBook
    // add static to call directly without instantiating Store class

    static getBooks(){

        // initialize books
        let books;

        // check for books item in local storage
        if(localStorage.getItem('books') === null){
             
            // if true set books to empty array
            books = [];

        } else {
            // get books and convert to JS array
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }

    static addBook(book){

        // get books array from local storage
        const books = Store.getBooks();

        // push book to books array
        books.push(book);

        // write updated books to localstorage
        // specify item to set and array
        // convert books array to string
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){

        // get books array from local storage
        const books = Store.getBooks();

        // loop through array
        books.forEach((book, index) => {

            // check if current book's isbn  matches
            if(book.isbn === isbn){

                // remove book
                books.splice(index, 1);
            }
        });

        // save changes to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }

}




// Events

// Display books event
// as soon as DOM loads run displayBooks() in UI class
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Add a book event
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent submit to log on console
    e.preventDefault();

    // on form submit
    // Get form values from book-form
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Form validation

    // if a field is blank
    if(title === '' || author === '' || isbn === ''){

        // call showAlert function
        // pass message and bootstrap alert type
        UI.showAlert('Please fill in all fields!', 'danger');

    } else {

            // Instantiate a book with Book class
            const book = new Book(title, author, isbn);

            // console.log(book);

            // Add book to UI class
            UI.addBookToList(book);

            // Add book to Store class
            Store.addBook(book);

            // Show success message
            UI.showAlert('Book Added!', 'success');

            // Clear fields
            UI.clearFields();
        }

});

// Remove a book event
document.querySelector('#book-list').addEventListener('click', (e) => {
    
    // Remove book from UI class
    // pass clicked element to UI.deleteBook()
    UI.deleteBook(e.target);

    // Remove book from Store class
    // get isbn from previous sibling element
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})

