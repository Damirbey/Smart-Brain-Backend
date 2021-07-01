const getAllUsers = (db)=>(req,res)=>{
        db.any("SELECT * FROM users WHERE id!=1 ")
        .then(users=>res.json(users));
}

module.exports={
    getAllUsers
}