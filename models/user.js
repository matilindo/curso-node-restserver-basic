const {Schema,model}=require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required:[true,'The name is required']
    },
    email:{
        type:String,
        required:[true,'The email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'The password is required'],
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

//sobreescribe le metodo toJSON para devolver los datos
//que el administrador quiera en este caso todo menos
//e; __v y el password
UserSchema.methods.toJSON = function (){
    const {__v,password,...user} = this.toObject();
    return user;
}

module.exports = model('User',UserSchema);

