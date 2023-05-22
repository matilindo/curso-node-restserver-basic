const {response ,request} = require('express');


const usersGet = (req=request,res=response)=>{
    const {q='no q',name,apikey} = req.query;
    res.json({
        msg:'get API controller',
        q,
        name,
        apikey
    })
}

const usersPost = (req,res=response)=>{
    const body = req.body;
    res.json({
        msg:'post API controller',
        body
    })
}

const usersPut = (req,res=response)=>{
    const id = req.params.id;

    res.json({
        msg:'put API controller',
        id
    })
}

const usersPatch = (req,res=response)=>{
    res.json({
        msg:'patch API controller'
    })
}

const usersDelete = (req,res=response)=>{
    res.json({
        msg:'delete API controller'
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}