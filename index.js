const express = require('express');
//required path to get all the paths in ejs
const path = require('path');


const port = 1000;

const db = require('./config/mongoose');
const Personal = require('./modal/signin');
const app = express();


var contact=[
    {
        name :"Aditya",
        mobile:"9999999"
    },
    {
        name :"anjali",
        mobile:"88654544"
    }
]

var signin =[
    {
        Email :"Aditya@gmail" ,
        password :"88377"

    }
]

//ejs use karne ka lia hme view engine set karna hoga 
app.set("view engine" , "ejs");
// __dirname hme current dir ki location send kar dega 
//eg hamari current dir hai C:\Users\Admin\Desktop\backend\newpractice &&&& join sa last ma views b add ho gye ga
//we dont preffer this bcoz saabke comp ma file ki location alag hoti hai 
//this line means ki views ko kaha sa accness kare ?? location kya hai views ki 
app.set('views' , path.join(__dirname ,'views'));


//this below is a middle ware 
//jab form sa data bhata jata hai tab vo encoded hota h hmra server cant read it 
// hence we need to url encoded to make it in readable form or can say that we want to convert it in form of object
app.use(express.urlencoded());

//the code below is used to read static files like css , js ,pictures 
// assets is the folder where this middlewere will find that files 

app.use(express.static('assets'));


app.post('/personal_value', (req, res) => {
    // Assuming you have defined the 'Personal' model for your database
    
    Personal.create({
        Email: req.body.Email,
        password: req.body.password
    }).then(() => {
        console.log("Added to database");
        return res.redirect('/');
    }).catch((err) => {
        console.error("Error in storing in the database:", err);
        return ;
    });
});


app.get('/contact' , (req , res)=>{
    //render means send me the file  or find me the file
    return res.render('contact' , {contact_list :contact});
    //  return res.render('contact.ejs');
});
// app.post('/contactwala' , (req , res)=>{
//     //  return res.redirect('/contact');
//     contact.push({name:req.body.name,
//       mobile:req.body.mobile
    
//     });
// });



//nice vala code thik h but ab ya call back accept nahi karta hence use async await


// app.get('/' , (req , res)=>{

//        Personal.find({} , ()=>{
         
//      } ).then((Personal)=>{
//         return res.redirect('home' , {personal_value1 : Personal});
//      }).catch((err)=>{return console.log("*******error*****"+err);});





//     //home is the ejs file name
// //    return  res.render('home' , {personal_value1 :signin });
// //    return res.render('home.ejs');
// });




app.get('/', async (req, res) => {
    try {
      // Use the `find` method on the Personal model to retrieve data
      const personalData = await Personal.find({});
  
      // Render a view or send a response with the data
      res.render('home', { personal_value1: personalData });
    } catch (err) {
      console.error("Error: " + err);
      res.status(500).send("Internal Server Error"); // Handle the error gracefully
    }
  });
  

// app.get('/delete_value/' , (req ,res)=>{
//    //here i am geting params
//    let dval = req.query.Email
  

//    //dval2 can be any name in its place 
//    let delval =  signin.findIndex(dval2=> dval2.Email == dval);
  
//    if(delval != -1){
//     signin.splice(delval ,1);
//    }
//    return res.redirect('back');
// });

// app.get('/delete_value' , async(req , res)=>{
//      try{
//         let value = req.query.id;
//         let the = await Personal.findByIdAndDelete(value ,{});
//          return res.redirect('back') ;
//      }catch{
//         return console.log("******Error******");
//      }


// });
app.get('/delete_value/', (req, res)=> {
    const id = req.query.id;
  
    Personal.findByIdAndDelete(id).then(() => {
      console.log("suscess in deleating the mobile" );
      return res.redirect('back');
    }).catch(err => {
      console.log('Error while deleting:', err);
      return;
    });
  });













app.listen(port , ()=>{
    console.log("connected to server  ");
});