const express = require('express')
const router = express.Router()
const jobsModel = require('../models/jobsModel')

router.get('/', async (req, res) => {
    try {
        const data=await jobsModel.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }
})
router.post('/', async (req, res) => {
    console.log(req.body);
    const result = new jobsModel(req.body)
    await result.save()
        .then(() => res.status(200).json({ message: "Successfully Added.",statusCode:200 }))
        .catch((error) =>{
            if (error.keyPattern.title) {
                res.status(500).json({ titleError: "Already Job title exists." })
            } else {
                res.status(500).json({ error: "There was a serser side error." })
            }
        } )
})
router.patch('/',async(req,res)=>{
    try {
       const result= await jobsModel.findByIdAndUpdate( req.query._id,{ status: req.query.status },{ new: true });
        res.json({ statusCode:200 ,result})
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        await jobsModel.findByIdAndRemove(req.params.id);
        return res.json({ message: 'Job deleted successfully',statusCode:200 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "There was a serser side error." })
    }
})
router.get('/:slug',async(req,res)=>{
    try {
        const slug = req.params.slug;
        const job = await jobsModel.findOne({slug});
        res.status(200).json(job);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: "There was a serser side error."});
      }
})
router.patch('/update',async(req,res)=>{
    try {
        const JobUpdated = await jobsModel.findByIdAndUpdate(req.body._id,req.body,{ new: true });
        res.status(200).json({message:'Successfully Updated',statusCode:200,JobUpdated});
      } catch (error) {
        console.error(error);
        if (error.keyPattern.title) {
            res.status(500).json({ titleError: "Already Job title exists." })
        }else {
            res.status(500).json({ error: "There was a serser side error." })
        }
      }
})
module.exports = router