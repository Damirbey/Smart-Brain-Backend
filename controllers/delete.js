const deleteUser=(db)=>(req,res)=>{
    const {id} = req.body;
    db.any("DELETE FROM users WHERE id = $1",[id])
    .then(users=>res.json("Success!"))
    .catch(err=>res.status(400).json("Can not delete user at the moment"));
}

module.exports={
    deleteUser
}