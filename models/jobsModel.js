const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    slug:String,
    longTitle:String,
    vacancy:Number,
    jobType:String,
    salary:String,
    location:String,
    publishedOn:String,
    deadline:String,
    jobResponsibilities:Array,
    educationalRequirements:Array,
    experienceRequirements:Array,
    status:{
        type:String,
        default:'deactive'
    },
    appliedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:"AppliedJob"
        }
    ]
})

module.exports=new mongoose.model('Job',jobSchema)