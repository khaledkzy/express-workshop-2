const express = require("express");
const app = express();
const fs = require('fs');


// Add this to the top of your file
const exphbs  = require('express-handlebars');

// Then these two lines after you initialise your express app 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { 'extensions': ['html'] }));

app.get('/', function (req, res) {
    const filePath = __dirname + '/data/posts.json';
    const callbackFunction = function(error, file) {
        // we call .toString() to turn the file buffer to a String
        const fileData = file.toString();
        // we use JSON.parse to get an object out the String
        const posts = JSON.parse(fileData);
        // send the json to the Template to render
        res.render('index', {
          title: 'Khaled Profile', // insert your name instead
          posts: posts
        });
    };
    fs.readFile(filePath, callbackFunction);
});

app.get('/my-cv', function (req, res) {
  res.render('my-cv',{
    title: 'khaled',
    subheading: 'Welcome To Khaled CV'
  })
})

app.get('/admin', function (req, res) {
  res.render('admin',{
    title: 'Admin khaled',
    subheading: 'Welcome Admin'
  })
})


app.get('/contact', function (req, res) {
  res.render('contact',{
    title: 'khaled',
    subheading: 'Contact Me '
  })
})
// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});