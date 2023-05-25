const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role='')=>
    {
        const existRole = await Role.findOne({role});
        if(!existRole){
            throw new Error(`The role ${role} is not registered in BD`);
        }

    }

const emailExist = async (email='')=>{
    //verifica si el correo existe
    const existEmail= await User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} is in use in BD`);
    }
}

const idExist = async (id='')=>{
    //verifica si el id existe
    const existId= await User.findById(id);
    if(!existId){
        throw new Error(`The id ${id} not exist in BD`);
    }
}


module.exports = {
        isRoleValid,
        emailExist,
        idExist
    }