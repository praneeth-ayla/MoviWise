const express = require('express');
const { spawn } = require('child_process');
require("dotenv").config()
const app = express();

app.set('view engine','ejs') //anpother engine: pug
app.use(express.urlencoded({extended:true})) //middleware to excess form values
app.use(express.static("public")) //use: /index.html in URL
app.use(express.json()) //allows us to touch json from body

//routers

const home = require("./routes/home")
app.use('/home', home)

const user = require("./routes/user")
app.use('/user', user)

const movie = require("./routes/movie")
app.use('/movie', movie)



app.get('/',(req,res)=>{
    res.redirect("/user")
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is live @${process.env.PORT}`)
})
