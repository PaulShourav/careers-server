const express=require('express')
const router=express.Router()
const applyJobModel=require('../models/applyJobModel')
const jobsModel = require('../models/jobsModel')

router.get('/',async(req,res)=>{
    try {
        const data=await applyJobModel.find({email:req.query.email}).populate('job')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }
})
router.get('/all-applied-jobs',async(req,res)=>{
    try {
        const data=await jobsModel.find({}).populate('appliedJobs')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }
})
router.post('/',async(req,res)=>{
    try {
        const findSomeJob= await applyJobModel.findOne({email:req.body.email,job:req.body.job})
        if (findSomeJob) {
            res.json({ statusCode:200 ,message:'Already you have been Applied the Job.'})
        }else{
            const result=new applyJobModel(req.body)
            const newAppliedJob=await result.save()
           await jobsModel.updateOne({_id:req.body.job},{$push:{appliedJobs:newAppliedJob._id}})
            
            res.json({ statusCode:200 ,message:'Sucessfully Applied the Job.',result})
        }
        
     } catch (error) {
         res.status(500).json({ error: "There was a serser side error." })
     }
})
module.exports=router