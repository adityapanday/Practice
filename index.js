const express = require('express');
const port = 1000;
const app = express();

app.get('/' , (req , res)=>{
 res.send("<h1>  all good till now <br> this is our home page </h1>");
});


app.listen(port , ()=>{
    console.log("all good every this is under control ");
});