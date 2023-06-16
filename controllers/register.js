const saltRounds = 10;

const registerNewUser = (db,bcrypt)=>(req,res)=>{
    const {name,surname,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    db.any("SELECT * FROM users WHERE email = $1",[email])
    .then(result=>{
        if(result.length===1)
        {
            res.status(400).json('Email is already taken');
        }
        else{
            console.log("HERE 2")
            db.any("INSERT INTO users (name,surname,email,entries,hash,joined) VALUES ($1,$2,$3,$4,$5,$6)",[name,surname,email,0,hashedPassword,new Date()])
            .then(response=>{
                    db.any("SELECT * FROM users WHERE email = $1",[email])
                    .then(user=>res.json(user));
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json('Oops something went wrong')});
        }
    });

}

module.exports={
    registerNewUser
}