const performSignIn = (db,bcrypt)=>(req,res)=>{
    const {email,password} = req.body;
    db.any("SELECT * FROM users WHERE email = $1",[email])
    .then(rows=>{
        if(rows.length===1)
        {
            const isValid = bcrypt.compareSync(password,rows[0].hash);
            if(isValid)
            {
                res.json(rows[0]);
            }
            else{
                res.status(400).json('Wrong Credentials');
            }
        }
        else
        {
            res.status(400).json('Not Found!');
        }
        
    })
    .catch(err=>res.status(400).json('Something went wrong'));
}

module.exports={
    performSignIn
}