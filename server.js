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
app.use(cors());
dotenv.config();
//const cn = 'postgres://postgres123:@postgresql-cubic-33584:5432/smart_brain';
/*const cn = new Client({
    connectionString: process.env.DATABAS_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });*/
  process.env.DATABASE_URL;
const db = pgp({connectionString:'postgresql://postgres:123@localhost:5432/smart_brain?sslmode=disable',
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