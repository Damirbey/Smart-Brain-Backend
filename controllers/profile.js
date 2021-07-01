const saltRounds = 10;
const profileUpdate=(db,bcrypt)=>(req,res)=>{
    const {id,name,surname,email,password} = req.body;
    if(password.length > 0)
    {
        const hashedPassword = bcrypt.hashSync(password,saltRounds);
        db.any("UPDATE users SET name = $1, surname = $2, email = $3 , hash = $4 WHERE id = $5",[name,surname,email,hashedPassword,id])
        .then(rows=>{
                db.any("SELECT * FROM users WHERE id = $1",[id])
                .then(user=>res.json(user));
        })
        .catch(err=>res.status(400).json('Something went wrong'));
    }
    else{
        db.any("UPDATE users SET name = $1, surname = $2, email = $3 WHERE id = $4",[name,surname,email,id])
        .then(rows=>{
            db.any("SELECT * FROM users WHERE id = $1",[id])
            .then(user=>res.json(user));
        })
        .catch(err=>res.status(400).json('Something went wrong'));
    }
}

module.exports={
    profileUpdate
}