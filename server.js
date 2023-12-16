const express = require('express');
const { spawn } = require('child_process');
require("dotenv").config()
const app = express();

app.set('view engine','ejs') //anpother engine: pug
app.use(express.urlencoded({extended:true})) //middleware to excess form values
app.use(express.static("public")) //use: /index.html in URL
app.use(express.json()) //allows us to touch json from body

//routers

const user = require("./routes/user")
app.use('/user', user)

const home = require("./routes/home")
app.use('/home', home)



app.get('/',(req,res)=>{
    res.redirect("/user")
})

app.get('/yo', async (req, res) => {

// Sample list to send to Python
const inputList = ["ironman", 2, 3, 4, 5];

// Spawn a child process for the Python script
const pythonProcess = spawn('python', ['./python/script.py']);

// Send the input list to Python as a JSON string
pythonProcess.stdin.write(JSON.stringify(inputList));
pythonProcess.stdin.end();

// Listen for data from the Python script's stdout
pythonProcess.stdout.on('data', (data) => {
  try {
    // Parse the JSON data received from Python
    const outputList = JSON.parse(data.toString());

    // Output the processed list
    console.log('Processed List from Python:', outputList);
  } catch (error) {
    console.error('Error parsing JSON data from Python:', error.message);
  }
});

// Listen for errors from the Python script's stderr
pythonProcess.stderr.on('data', (data) => {
  console.error('Error from Python script:', data.toString());
});

// Listen for the Python script's exit event
pythonProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Python script exited with code ${code}`);
  }
});

});

app.listen(process.env.PORT,()=>{
    console.log(`Server is live @${process.env.PORT}`)
})
