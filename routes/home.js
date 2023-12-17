//using router
const express = require('express')
const router = express.Router()

router.get("/:movi", (req,res) =>{
  res.render("moviePage/moviePage")

})
module.exports = router
