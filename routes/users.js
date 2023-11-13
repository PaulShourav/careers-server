const express=require('express')
const multer  = require('multer')
const router=express.Router()
const fs = require('fs');
const path = require('path');

const usersModel=require('../models/usersModel')

// Define the upload folder
const uploadFolder = 'uploads/';

// Ensure the upload folder exists; create it if not
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}
const storage=multer.diskStorage({
    destination:function (req,file,cd) {
         cd(null,uploadFolder)
    },
    filename:function(req,file,cd){
       cd(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


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
        const data=await usersModel.findOne({email:req.query.email,role:"admin"}).select('email')
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"There was a serser side error."})
    }
    
    
})
router.post('/',upload.single('file'),async(req,res)=>{
    const data=JSON.parse(req.body.newData)
    data['resumeFile']=req.file.filename
  
    const result=new usersModel(data)
    await result.save()
    .then(()=>res.status(200).json({message:"Successfully Sign up."}))
    .catch((err)=>res.status(500).json({error:"There was a serser side error."}))
    
})
module.exports=router