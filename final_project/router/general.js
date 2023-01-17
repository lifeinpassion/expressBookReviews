import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//register a new user
public_users.post("/register", (req,res) => {
  const email = req.body.email;
  if (users[email]) {
    res.send("User already exists!");
  } else {
    if (!isValid(req.body.password)) {
      res.send("Password should be at least 8 characters long and should contain at least one number, one uppercase and one lowercase letter");
    }
    if (!req.body.firstName) {
      res.send("Please enter your first name");
    }
    if (!req.body.lastName) {
      res.send("Please enter your last name");
    }
    users[email] = {
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    res.send("User has been registered!");
  }
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
  res.send(books[author]);
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
  res.send(books[title]);
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
  res.send(reviews[isbn]);
});

module.exports.general = public_users;
