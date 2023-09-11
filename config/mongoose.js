const mongoose =require ('mongoose');

// learn this line mongodb://127.0.0.1:27017/ kuch dikkat h mare pc ma local host sa nahi chal reha hai 
mongoose.connect("mongodb://127.0.0.1:27017/").then(()=> console.log("connected to data base")).catch((err)=>console.log("error in connecting "+""+err));