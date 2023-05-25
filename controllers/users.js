const {response ,request} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const usersGet = async (req=request,res=response)=>{
    const {q='no q',name,apikey} = req.query;
    const {limit=5,from=0} = req.query;
    // const users = await User.find({status:true})
    // .skip(from)
    // .limit(limit);
    //const total = await User.countDocuments({status:true});
    const [users,total]= await Promise.all([
        User.find({status:true})
    .skip(from)
    .limit(limit),
    User.countDocuments({status:true})
    ]);

    res.json({
        "total users":total,
        users
    });
}

const usersPost =async (req,res=response)=>{
   

    const {name,email,password,role} = req.body;
    const user =new User({name,email,password,role});
    
    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    user.password=bcryptjs.hashSync(password,salt);

    //guarda en la base de datos el nuevo usuario
    await user.save();
    res.json({
        user
    })
}

const usersPut =async (req,res=response)=>{
    const {id} = req.params;
    const{_id,password,google,email,...resto}=req.body;

    if(password)
    {
    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password=bcryptjs.hashSync(password,salt);
    }

    const user=await User.findByIdAndUpdate(id,resto, {new: true});

    res.json(user);
}

const usersPatch = (req,res=response)=>{
    res.json({
        msg:'patch API controller'
    })
}

const usersDelete = async (req,res=response)=>{

    const {id} = req.params;

    //borrado fisico
    //const user = await User.findByIdAndDelete(id);

    //borrado logico
    const user = await User.findByIdAndUpdate(id,{status:false});

    res.json({
        id
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}