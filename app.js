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

// CATEGORY SCHEMA
var categorySchema = new mongoose.Schema({
  title: String,
  image: String,
  members: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
var Category = mongoose.model("Category", categorySchema);

// POST SCHEMA
var postSchema = new mongoose.Schema({
  title: String,
  body: String,
  create: {type: Date, default: Date.now},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});
var Post = mongoose.model("Post", postSchema);

// COMMENTS SCHEMA
var commentSchema = mongoose.Schema({
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  username: String,
  profilePicture: String
});
var Comment = mongoose.model("Comment", commentSchema);

// ROUTES
app.get("/", function(req, res){
  res.redirect("home");
});

// RESTFUL ROUTES
// INDEX
app.get("/home", function(req, res){
  Category.find({}, function(err, categories){
    if(err){
      res.redirect("home");
    } else {
      res.render("homePage", {categories: categories});
    }
  });
});

// NEW ROUTE
app.get("/home/new", function(req, res){
  res.render("new");
});

// CREATE ROUTE
app.post("/home", function(req, res){
  Category.create(req.body.category, function(err, newCategory){
    if(err){
      res.render("new");
    } else {
      res.redirect("/home");
    }
  });
});

// SHOW ROUTE
app.get("/home/:id", function(req, res){
  Category.findById(req.params.id).populate("comments").exec(function(err, currCategory){
    if(err){
      res.redirect("/home");
    } else {
      res.render("show", {category: currCategory});
    }
  });
});

// ROUTES FOR CREATING A POST WITHIN A CATEGORY
app.get("/:id/new", function(req, res){
  Category.findById(req.params.id, function(err, currCategory){
    res.render("newPost", {category: currCategory});
  });
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
