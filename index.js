import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const blog=[];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/submit",(req,res)=>{
    
    blog.push(req.body);
    res.render("index.ejs",{blog:blog});
})

app.post("/delete",(req,res)=>{
 
    blog.splice(req.body["indexValue"], 1);
    res.render("index.ejs",{blog:blog});
})

app.post("/edit",(req,res)=>{
 
    let n=req.body["indexValue"];
    let editBlog = {name:blog[n]["name"],title:blog[n]["title"], content:blog[n]["content"], indexValue:n};
    res.render("edit.ejs",editBlog);
})
app.post("/finalEdit",(req,res)=>{
   
    let n=req.body["indexValue"];
    blog[n]["name"]=req.body["name"];
    blog[n]["title"]=req.body["title"];
    blog[n]["content"]=req.body["content"];
    res.render("index.ejs",{blog:blog});
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})