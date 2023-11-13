const express=require('express')
const router=express.Router()
const applyJobModel=require('../models/applyJobModel')
const jobsModel = require('../models/jobsModel')

router.get('/',async(req,res)=>{
    console.log(req.query.email);
    try {
        const data=await applyJobModel.find({email:req.query.email}).populate('job')
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
            await result.save()
            res.json({ statusCode:200 ,message:'Sucessfully Applied the Job.',result})
        }
        
     } catch (error) {
         res.status(500).json({ error: "There was a serser side error." })
     }
})
module.exports=router