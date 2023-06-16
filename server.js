const express = require('express');
const dotenv =require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')({});
const { Client } = require('pg');
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/imageUpload');
const profile = require('./controllers/profile');
const users = require('./controllers/users');
const deleteOperation= require('./controllers/delete');
app.use(bodyParser.json());

dotenv.config();

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

const db = pgp({connectionString:process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }});

app.get("/",(req,res)=>{res.send("Working");

db.any("SELECT * FROM users").then((result)=>{console.log("result is ", result)}).catch(err=>console.log(err))

})

/**************************************************/
/*********************Signin*************************/
app.post('/signIn',signIn.performSignIn(db,bcrypt));

/**************************************************/
/*********************Register*************************/
app.post("/register",register.registerNewUser(db,bcrypt));

/**************************************************/
/*********************Image*************************/
app.put('/image',image.uploadImage(db));

/**************************************************/
/*********************Clarifai*********************/
app.post('/clarifai',image.handleClarifaiRequest);

/**************************************************/
/*****************Profile Update*******************/
app.put('/profileUpdate',profile.profileUpdate(db,bcrypt));

/**************************************************/
/************Users Endpoint for Admin**************/
app.get('/users',users.getAllUsers(db));

/**************************************************/
/******************Delete User*********************/
app.delete('/deleteUser',deleteOperation.deleteUser(db));

/**************************************************/
/**************Running the server*****************/
app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT);
})