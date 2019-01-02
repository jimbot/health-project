var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
var app = express();

app.set("view engine", "ejs");
// serve css files from public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// MOMENT JS
app.locals.moment = require('moment');

// METHOD OVERRIDE FOR PUT AND DELETE REQUESTS
// we do this to follow the RESTful ROUTES and CRUD pattern
app.use(methodOverride("_method"));

// Connect database
mongoose.connect("mongodb://james:james1@ds147684.mlab.com:47684/health-app", {useNewUrlParser: true});

// ROUTES
app.get("/", function(req, res){
  res.render("home");
});


// LISTENERS
// HEROKU
app.listen(process.env.PORT || 5000, function(){
  console.log("Heroku server updated.");
});
// LOCALHOST
app.listen(3000, function(){
  console.log("listening on port 3000");
});
