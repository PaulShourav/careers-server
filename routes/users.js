const express=require('express')
const router=express.Router()
const usersModel=require('../models/usersModel')

router.get('/',async(req,res)=>{
   
    try {
        const data=await usersModel.find({})
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({error:"There was a serser side error."})
    }
    
    
})
router.get('/adminUser',async(req,res)=>{
   console.log('admin');
    try {
        const data=await usersModel.find({email:req.query.email,role:"admin"}).select('email')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"There was a serser side error."})
    }
    
    
})
router.post('/',async(req,res)=>{
    console.log(req.body);
    const result=new usersModel(req.body)
    await result.save()
    .then(()=>res.status(200).json({message:"Successfully Sign up."}))
    .catch((err)=>res.status(500).json({error:"There was a serser side error."}))
    
})
module.exports=router