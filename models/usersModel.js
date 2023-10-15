const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:Number,
    gender:String,
    resumeFile:String,
    role:{
        type:String,
        default:"candidate"
    },
    created_at:{
        type:Date,
        default:new Date

    }

})
module.exports =new mongoose.model('User',userSchema)