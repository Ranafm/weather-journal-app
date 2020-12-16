// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('http');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
function listen(){
    console.log('Server running')
    console.log(port);
}

const server = app.listen(port,listen);
console.log(server);


// GET route
function getData(request,response){
    response.send(projectData);
}
app.get('/all',getData)

//POST route
function postData(request,response){
       
        projectData.temp =request.body.temp;
        projectData.date =request.body.date;
        projectData.feeling =request.body.feel;

}
app.post('/add',postData)
