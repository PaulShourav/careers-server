const mongoose=require('mongoose')

const applyJobSchema=mongoose.Schema({
    email:String,
    job:{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
})
module.exports=new mongoose.model('AppliedJob',applyJobSchema)