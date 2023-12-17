//using router
const express = require('express')
const router = express.Router()
const { spawn } = require('child_process');
const mongoose = require("mongoose") 
require("dotenv").config()
let prsnt = null //the thing
var flagLogin = false;
var recoList = null;
// //database connection
mongoose.connect(process.env.atlas1+process.env.atlas2+process.env.atlas3+process.env.atlas4)
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database in USERS")})
const userSchema = new mongoose.Schema({Name: String,
                                        password: String,
                                        email: String})
USER = mongoose.model("User", userSchema)


router.get("/",(req,res) =>{
    if (prsnt==null){
        res.redirect("/user/login")
    }
    else{
        res.redirect("/home") 
    }
   })

router.get("/login",(req,res) =>{
    if (prsnt==null){
        res.render("user/login")
    }else{
    res.redirect('/home')    
    }
    
})

router.get("/signup",(req,res) =>{
    res.render('user/signup')
   })
   

router.get("/out",(req,res)=>{
    prsnt = null;
    console.log("See you soon "+flagLogin.userIn.Name)
    flagLogin.userIn.Name = false;
    module.exports.userInfo= {pres:null,user:null}
    res.redirect("/user/login")
})

router.get("/selectGenre",(req,res)=>{
    res.render("user/genrePage")
})



// GENRE GETTING FILE
router.post("/selectGenre", (req,res)=>{

    genre= Object.keys(req.body)
    console.log("your genres: ",genre)


    // Sample list to send to Python
    const inputList = genre;
    const pythonProcess = spawn('python', ['./Recommended_Dataset_Model/main.py']);

    // Send the input list to Python as a JSON string
    pythonProcess.stdin.write(JSON.stringify(inputList));
    pythonProcess.stdin.end();

    // Listen for data from the Python script's stdout
    pythonProcess.stdout.on('data', (data) => {
    try {
    const outputList = JSON.parse(data.toString()); //THE RECOMMENDED LIST
    recoList= outputList
    module.exports.recoList = recoList;
    // Output the processed list
    console.log('Processed List from Python:', outputList);
    } catch (error) {
        console.error('Error parsing JSON data from Python:', error.message);
    }
    });

    //errors handling Python 
    pythonProcess.stderr.on('data', (data) => {
    console.error('Error from Python script:', data.toString());
    });

    // Listen for the Python script's exit event
    pythonProcess.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
    }
    });

    res.redirect("/user/selectWatched")
} )





router.get("/selectWatched", (req,res)=>{

    res.render("user/selectWatched",{listDeMovie:recoList})
})

router.post("/selectWatched", (req,res)=>{
    console.log("Function is under Development")

})


//signup
router.post("/signup",(req,res)=>{
    //console.log(req.body);
    var flagSingup = false;
    flagChangeSign()
    async function flagChangeSign(){
    if (req.body.name!='' && 
        req.body.password!='' &&
        req.body.email!=''){
        flagChangeSign = await insertUser(req.body.name,req.body.password,req.body.email)    
        if (flagChangeSign==true){prsnt=null;
            module.exports.userInfo = {pres:null,user:null};
            return res.redirect("/user/selectGenre")
        }else{console.log("Email-id already in use, Try Signing In")}
    }
}
})




//login
router.post("/login",(req,res)=>{
    if (req.body.email!='' &&
        req.body.password!=''){
    flagChangeLog()
    async function flagChangeLog(){
    flagLogin = await loginUser(req.body.email,req.body.password)
    if (flagLogin.flag==true){prsnt=0;
        module.exports.userInfo = {pres:prsnt,user:flagLogin.userIn};
        res.redirect("/user")}
    else{console.log("Invalid email or Password")}
  } 
}   
    
})







//-------------------------FUNCTIONS---------------------------------

//signup function
async function insertUser(name,passwd,mail){
    var data= new USER({Name : name,
                        password : passwd,
                        email : mail
                      })
    try{
        var already = await USER.findOne({email:mail})
        if (already == null){
            await data.save()
        console.log("Welcome to Nebula "+data.Name)
        }else{return false}
    }catch(e){console.log(e.message)}
    return true
}

//login function
async function loginUser(mail, passwd){
    try{
        var userOn = await USER.findOne({email:mail,password:passwd})
        if (userOn == null){
            console.log("DB said: No such user")
            return false
        }else{
        console.log("How have you been "+userOn.Name)
        }
    }catch(e){console.log(e.message)}
    return {flag:true,userIn:userOn}
    }
    
//printAuth()
async function printAuth(){
    setInterval(async=>{
        console.log(prsnt)
        module.exports.pres = prsnt
    },1000)
}

module.exports = router
