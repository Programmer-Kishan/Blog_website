

const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postTitle = ["Day 1", "Day 2"];

let postText = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
];


app.get("/", (req, res) => {

  // fs.mkdir(path.join(__dirname+"/posts"),{}, err=> {
  //   if(err) throw err;
  //   console.log("Folder Created");
  // })
  for(let i = 0; i < postTitle.length; i++) {
    let fileName = postTitle[i].split(" ").join("") + ".ejs";
    let content = "<%- include('header'); -%> <div class='content'> <h4 class='post-title'> " + postTitle[i] + " </h4> <p class='content-text'> " + postText[i] + "</p> </div> <%- include('footer'); -%>";
    fs.writeFile(path.join(__dirname+"/views", fileName),content, err=> {
      if(err) throw err;
      console.log("File created");
    });
  }
  res.render("home.ejs", {contentTitle: postTitle, contentText: postText});
});

// app.post("/", (req, res) => {
//   res.redirect("/post");
// })

app.get("/about", (req, res) => {
  res.render("about.ejs", {});
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {}); 
});

for(let i = 0; i < postTitle.length; i++) {
  let route = "/" + postTitle[i].split(" ").join("");
  let file = postTitle[i].split(" ").join("") + ".ejs"
  console.log(route + file);
  app.get(route, (req, res) => {
    res.render(file, {});
  })
}

app.get("/post", (req, res) => {
  res.render("post.ejs", {});
});

app.post("/post", (req, res) => {
  postTitle.push(req.body.title);
  postText.push(req.body.text);
  // console.log(postTitle + postText);
  for(let i = 0; i < postTitle.length; i++) {
    let route = "/" + postTitle[i].split(" ").join("");
    let file = postTitle[i].split(" ").join("") + ".ejs"
    console.log(route + file);
    app.get(route, (req, res) => {
      res.render(file, {});
    })
  }
  res.redirect("/")
});


app.listen(3000, () => {
  console.log("Server started to run at port 3000");
})
