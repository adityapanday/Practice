const mongoose = require ('mongoose');

const signin = new mongoose.Schema({
Email:{
    type:String,
    required:true
},
password:{
    type:String ,
    required:true
}
});

// Personal 1st vala = name jisme store kara h schema ki data
// or 2nd vala is used for to define ki db ma kaya nam store hoga
const Personal = mongoose.model('Personal' , signin );
 module.exports = Personal;

