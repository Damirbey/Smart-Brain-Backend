const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')({});
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/imageUpload');
const profile = require('./controllers/profile');
const users = require('./controllers/users');
const deleteOperation= require('./controllers/delete');
app.use(bodyParser.json());
app.use(cors());

const cn = 'postgres://postgres:123@localhost:5432/smart_brain';
const db = pgp(cn);

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