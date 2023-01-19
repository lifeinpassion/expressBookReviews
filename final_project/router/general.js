const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//register a new user
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

//

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books));
});

// TASK 10 - Get the book list available in the shop using promises
public_users.get('/books',function (req, res) {

  const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 10 resolved"));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });

 // Task 11 - Get book details based on ISBN using Promise callbacks or async-await with Axios
public_users.get('/books/isbn/:isbn',function (req, res) {
  
    const get_book = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn]));
      });
  
      get_book.then(() => console.log("Promise for Task 11 resolved"));
  
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  // iterate through the value of the books object and find all the books by the author
  let books_by_author = [];
  for (let book in books) {
    if (books[book].author === author) {
      books_by_author.push(books[book]);
    }
  }
  if (books_by_author.length === 0) {
    res.send("No books by this author");
  } else {
    res.send(books_by_author);
  }
});

// Task 12 - Get book details based on author using Promise callbacks or async-await with Axios
public_users.get('/books/author/:author',function (req, res) {
    
      const get_book = new Promise((resolve, reject) => {
          resolve(res.send(books[author]));
        });
    
        get_book.then(() => console.log("Promise for Task 12 resolved"));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  // iterate through the value of the books object and find all the book with the specific title
  let books_by_title = [];
  for (let book in books) {
    if (books[book].title === title) {
      books_by_title.push(books[book]);
    }
  }
  if (books_by_title.length === 0) {
    res.send("No books with this title");
  } else {
    res.send(books_by_title);
  }
});

// Task 13 - Get book details based on title using Promise callbacks or async-await with Axios
public_users.get('/books/title/:title',function (req, res) {
        const get_book = new Promise((resolve, reject) => {
            resolve(res.send(books[title]));
          });
      
          get_book.then(() => console.log("Promise for Task 13 resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Get the book reviews based on ISBN provided in the request parameters.
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
