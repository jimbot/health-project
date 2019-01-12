# Uplift  

Uplift is a social web application dedicated to help start a conversation around mental health.

Uplift is powered by a safe and anonymous community for BCIT students and encourages embracing difficult situations and topics together as a community.

This web app was created by Group 3 at BCIT's 24 hour, Co-op Hackathon Competition.

**website** https://uplift-bcit.herokuapp.com

## Technical Specifications

Uplift follows RESTful routing conventions and implements CRUD to allow users to manage Posts, Updates, and Comments.

**Public Folder** CSS files  

**Views Folder** 
* .ejs files that render all web pages  
* Mongo Schemas
* Embedded data
* Post Schema references Comments Schema and User Schema
* User Schema references their own Posts and is referenced by the Comment Schema

**NPM Packages**
* EJS, express, mongoose, body-parser, moment.js
* passport.js (for authentication and security)

## Authors

* **James Chen** - [jimbot](https://github.com/jimbot)
* **Mike Vu** - [mikevu23](https://github.com/mikevu23)
* **Kyle Browne** - [kbrownebcit](https://github.com/kbrownebcit)
* **Angus Lin** - [AngoosHub](http://github.com/AngoosHub)
* **Bal Parmar** - [balparmar](https://github.com/balparmar)
* **Evano Hirabe** - [Hevano](https://github.com/Hevano)
