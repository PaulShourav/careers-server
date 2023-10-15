const express=require('express')
const router=express.Router()
const applyJobModel=require('../models/applyJobModel')

router.post('/',async(req,res)=>{
    try {
        const findSomeJob= await applyJobModel.findOne({email:req.body.email,jobId:req.body.jobId})
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