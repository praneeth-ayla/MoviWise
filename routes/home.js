//using router
const express = require('express')
const router = express.Router()

router.get("/:movi", (req,res) =>{
  res.render("moviePage/moviePage")


    const baseURL = "https://api.themoviedb.org/3/"
    const deets = "movie/"
    const mID = req.params.movi
    console.log("value from params: "+mID)
    const apiKey = "?api_key=2487b9ddee7f94d0e9d3841a653b3871";
    let URLreq = baseURL+deets+mID+apiKey


    // `https://image.tmdb.org/t/p/w500${}`
    // console.log(URLreq)
    // fetch(URLreq).then(res=> {
    //     res.json}).then(data=>{
    //     res.send(data)
    // })
    

    fetch(URLreq)
    .then(response => {
      // Check if the request was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON from the response
      return response.json();
    })
    .then(jsonData => {
      // Do something with the parsed JSON data
      console.log(jsonData);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });



})

module.exports = router
