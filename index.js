const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "Anwar",
        content: "i got my first 1 lakh per month software dev job in uk "

    },
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "i love coding!"

    },
    {
        id: uuidv4(),
        username: "andrew",
        content: "Hard work is important to Achieve success"
    },
];


app.listen(port, () => {
    console.log(`listening to the port : ${port}`);
});

//main request
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//to create new post.
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

//to push new post into array.
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

//to see specific user post in detail.
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("show.ejs", { post });
});

//to edit a post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("edit.ejs", { post })
});


//to update a specific user content.
app.patch("/posts/:id", (req, res) => {
    //path parameter id
    let { id } = req.params;
    let content = req.body.content;
    console.log(id);
    //if path parameter id is equal to specific posts id.
    let post = posts.find((p) => id === p.id);
    post.content = content;
    console.log(post);
    res.redirect("/posts");
});


//to delete a post
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !==p.id);
})