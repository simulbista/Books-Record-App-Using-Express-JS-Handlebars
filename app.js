/********************************************************************************* * ITE5315 – Assignment 2 * I declare that this assignment is my own work in accordance with Humber 
Academic Policy. * No part of this assignment has been copied manually or electronically from any other 
source * (including web sites) or distributed to other students. * * 
Name: ________Simul Bista______Student ID: _ N01489966____ Date: ______April 3, 2023______________ * * ********************************************************************************/
// handlebars implementation (express,node js)

const express = require("express");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars");
const fs = require("fs");

//register eq helper method to be used in data.hbs to compare if searched title from the form exists in books.json
const hbs = handlebars.create({
  layoutsDir: `${__dirname}/views/layouts`,
  //reduce handlebars extension name to hbs
  extname: "hbs",
  defaultLayout: "index",
  partialsDir: `${__dirname}/views/partials`,

  // create custom helpers
  helpers: {
    eq: function (a, b) {
      console.log("a:", a, "b:", b);
      return a === b;
    },
  },
});

app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

// Serve static files from the public directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("main");
});

//display books.json data
app.get("/data", (req, res) => {
  const myData = fs.readFileSync("books.json");
  const books = JSON.parse(myData);
  res.render("data", { books });
});

app.get("/data/isbn/:isbn", (req, res) => {
  const myData = fs.readFileSync("books.json");
  const books = JSON.parse(myData);
  let foundBook = null;
  searchedIsbn = req.params.isbn;

  for (let id = 0; id < books.length; id++) {
    if (books[id].isbn === searchedIsbn) {
      foundBook = books[id];
      break;
    }
  }

  if (foundBook) {
    res.render("data-isbn", { foundBook: foundBook, searchedIsbnNo: searchedIsbn });
  } else {
    res.render("data-isbn", { searchedIsbnNo: searchedIsbn });
  }

});


/** Decode Form URL Encoded data */
app.use(express.urlencoded({ extended: true }));

// Process POST request through the form for title search
app.post("/submittedTitle", function (req, res, next) {
  // console.log('im in app.js');
  const myData = fs.readFileSync("books.json");
  const books = JSON.parse(myData);
  let foundBook,notfoundBook = null;
  submittedTitle = req.body.title;
  for (let id = 0; id < books.length; id++) {
    if (books[id].title === submittedTitle) {
      foundBook = books[id];
      break;
    }
  }

  if (foundBook) {
    console.log(foundBook);
    res.render("data", { foundBook: foundBook, submittedTitle: submittedTitle });
  } else {
    res.render("data", { notfoundBook: notfoundBook,submittedTitle: submittedTitle });
  }
});


app.listen(port, () => {
  console.log(`App listening to port ${port}!`);
});
