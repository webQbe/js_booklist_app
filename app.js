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

}

// Store class : Handles storage

// Events

// Display books event
// as soon as DOM loads display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Add a book
// Remove a book