const Clarifai = require('clarifai');
const dotenv =require('dotenv');
dotenv.config();

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
   });

const uploadImage = (db)=>(req,res)=>{
    const {email} = req.body;
    db.any("UPDATE users SET entries = entries+1 WHERE email = $1",[email])
    .then(result=>{
        db.any("SELECT entries FROM users WHERE email = $1",[email])
        .then(count=>res.json(count[0].entries));
    })
    .catch(err=>res.status(404).json("Ooops something went wrong"));
}

const handleClarifaiRequest = (req,res)=>{
    const {image} = req.body;
    app.models.predict('face-detection',image)
   .then(data=>res.json(data));
}
module.exports={
    uploadImage,
    handleClarifaiRequest
}