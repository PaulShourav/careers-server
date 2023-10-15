const mongoose=require('mongoose')

const applyJobSchema=mongoose.Schema({
    email:String,
    jobId:String,
    slug:String,
})
module.exports=new mongoose.model('AppliedJob',applyJobSchema)