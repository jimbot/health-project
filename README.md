# Uplift  

Uplift is a social app dedicated to starting a conversation around mental health, powered by a safe and anonymous community for BCIT students.

Uplicat follows RESTful routing conventions and implements CRUD to allow users to manage Posts, Updates, and Comments.

This web app was created by Group 3 at BCIT's 24 hour, Co-op Hackathon Competition.

**website** https://uplift-bcit.herokuapp.com

## Technical Specifications

**Public Folder** CSS files  

**Views Folder** .ejs files that render all web pages  

**Models Folder** 
* Mongo Schemas
* Embedded data
* Project Schema references Comments Schema and Update Schema
* User Schema references their own Projects and is referenced by Update, Project, and Comment Schemas

**Routes Folder** 
* Handles and renders all user requests
* Middleware used to check if current User is logged in to determine whether or not they can make POST requests
* Middleware to check author of current Project before they make a DELETE request

**NPM Packages used**
* EJS, express, mongoose, body-parser, moment.js
* passport.js (for authentication and security)

## Authors

* **James Chen** - [jimbot](https://github.com/jimbot)
* **Mike Vu** - [mikevu23](https://github.com/mikevu23)
* **Kyle Browne** - [kbrownebcit](https://github.com/kbrownebcit)
* **Angus Lin** - [AngoosHub](http://github.com/AngoosHub)
* **Bal Parmar** - [balparmar](https://github.com/balparmar)
* **Evano Hirabe** - [Hevano](https://github.com/Hevano)
