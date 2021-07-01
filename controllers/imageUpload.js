const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7d0b3c60878247aca2be076cee85a2c1'
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
    app.models.predict(Clarifai.FACE_DETECT_MODEL,image)
   .then(data=>res.json(data));
}
module.exports={
    uploadImage,
    handleClarifaiRequest
}