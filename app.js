
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { lowerCase } = require("lodash");

const homeStartingContent = "This is the home page for the blog website . Here you can see all the other blogs created by you and go to them . ";
const aboutContent = "This is the about section for this blog . This blog is basically a project I created after learning from javascript module on Udemy. It was amazing to make such a thing all by myself.  ";
const contactContent = "This the contact section for this blog . I am not adding any contact for now but it will come soon. ";

const app = express();

let posts = [];

app.set('view engine', 'ejs');   //*

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Home
app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    posts: posts
  });
  
});

// About
app.get("/about",function(req,res){
  res.render("about",{
    aboutContent:aboutContent,
  });
});

// Contact
  app.get("/contact",function(req,res){
    res.render("contact",{
      contactContent:contactContent,
    });
  });

 //Compose
  app.get("/compose",function(req,res){
    res.render("compose");
  });

  app.get("/posts/:postName",function (req,res) { 
    const requestedTitle = _.lowerCase(req.params.postName);
    
    

    posts.forEach(function(post){
     const storedTitle = _.lowerCase(post.title); 

   if(requestedTitle === storedTitle  ){
      
      res.render("post",{
        title: post.title,
        content:post.content
      });

   }
  });
   });




  //posting data back 
app.post("/compose",function(req,res){
  
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/"); //at home page 


});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
