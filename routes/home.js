//using router
const express = require('express')
const router = express.Router()
const path= require("path")
let dir = __dirname;

router.get("/", (req,res) =>{
  let recoList = require("../routes/user.js").recoList ||  [8960, 2048,  1924, 
                                                          271110, 1927, 76170,
                                                          1930,  268, 44943, 99861]
      console.log(recoList);
  res.sendFile(path.join(dir,"../public/home/home.html"))        
    })

router.get("/surprise",(req,res)=>{
  res.sendFile(path.join(dir,"../public/home/home.html"))
})

router.get("/lists",(req,res)=>{
  res.sendFile(path.join(dir,"../public/home/home.html"))
})

router.get("/explore",(req,res)=>{
    res.render("home/recommend")
})
module.exports = router
