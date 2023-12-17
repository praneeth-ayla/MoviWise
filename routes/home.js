//using router
const express = require('express')
const router = express.Router()

router.get("/", (req,res) =>{
  let recoList = require("../routes/user.js").recoList ||  [8960, 2048,  1924,
    271110, 1927, 76170,
      1930,  268, 44943,
     99861]
      console.log(recoList);
  res.render("home/home",{reco:recoList})

        
    })
    
router.get("/explore",(req,res)=>{
    res.render("home/recommend")
})
module.exports = router
