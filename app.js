/********************************************************************************* * ITE5315 – Assignment 2 * I declare that this assignment is my own work in accordance with Humber 
Academic Policy. * No part of this assignment has been copied manually or electronically from any other 
source * (including web sites) or distributed to other students. * * 
Name: ________Simul Bista______Student ID: _ N01489966____ Date: ______April 3, 2023______________ * * ********************************************************************************/
// handlebars implementation (express,node js)

const express = require("express");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars").engine;
const fs = require("fs");


//register eq helper method to be used in data.hbs to compare if searched title from the form exists in books.json
// handlebars.create({ helpers: { eq: (a, b) => a === b } });

app.set("view engine", "hbs");
app.engine(
  '.hbs',
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    //reduce handlebars extension name to hbs
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials`,
  })
);

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

//display isbn for books based on the index number in the url
// http://localhost:5500/data/isbn/0 should display 1933988673
app.get("/data/isbn/:iNo", (req, res) => {
  const myData = fs.readFileSync("books.json");
  const books = JSON.parse(myData);
  iNo = req.params.iNo;
  res.render("data-isbn",{'searchedINo':iNo,'foundIsbn':books[iNo].isbn});
});

/** Decode Form URL Encoded data */
app.use(express.urlencoded({ extended: true }));

// Process POST request through the form for title search
app.post("/submittedTitle", function (req, res, next) {
  let myData = fs.readFileSync("books.json");
  let books = JSON.parse(myData);
  const { title } = req.body;
  res.render("data",{'books':books,'searchedTitle':title});

});

app.listen(port, () => {
  console.log(`App listening to port ${port}!`);
});
