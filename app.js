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
       
        const StoredBooks = [
             // hardcode array of books
             // pretend they're coming from local storage
            {
                title : 'Book One',
                author : 'John Doe',
                isbn : '3434434'
            },
            {
                title : 'Book Two',
                author : 'Jane Doe',
                isbn : '45545',
            }
        ]

        const books = StoredBooks;

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


    }

    // clear fields
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

// Store class : Handles storage



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

            // Add book to UI
            UI.addBookToList(book);

            // Clear fields
            UI.clearFields();
        }

});

// Remove a book event
document.querySelector('#book-list').addEventListener('click', (e) => {

    // display which element is clicked
    // console.log(e.target);
    
    // pass clicked element to UI.deleteBook()
    UI.deleteBook(e.target);

})

