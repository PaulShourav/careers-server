const express = require('express')
const multer = require('multer')
const router = express.Router()
const fs = require('fs');
const path = require('path');

const usersModel = require('../models/usersModel')

// Define the upload folder
const uploadFolder = 'uploads/';

// Ensure the upload folder exists; create it if not
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}
const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, uploadFolder)
    },
    filename: function (req, file, cd) {
        cd(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


router.get('/', async (req, res) => {

    try {
        const data = await usersModel.find({})
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }


})
// Get user by email where user role type is admin
router.get('/adminUser', async (req, res) => {
    try {
        const data = await usersModel.findOne({ email: req.query.email, role: "admin" })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }


})
//Get all user where role type is admin
router.get('/all-admin-users', async (req, res) => {
    console.log(req.query.role);
    try {
        const data = await usersModel.find({role: req.query.role }) 
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }
})
router.get('/candidateUser', async (req, res) => {
   
    try {
        const data = await usersModel.findOne({ email: req.query.email, role: "candidate" })
       
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: "There was a serser side error." })
    }


})
router.post('/', upload.single('file'), async (req, res) => {
    const data = JSON.parse(req.body.newData)
    data['resumeFile'] = req.file.filename

    const result = new usersModel(data)
    await result.save()
        .then(() => res.status(200).json({ message: "Successfully Sign up." }))
        .catch((err) => res.status(500).json({ error: "There was a serser side error." }))

})
router.patch('/update',upload.single('file'), async (req, res) => {
    const data = JSON.parse(req.body.newData)
    const email = data.email
        const findCandidate = await usersModel.findOne({ email });
        if (findCandidate.resumeFile && data.resumeFile) {
            const oldFilePath ='uploads/'+findCandidate.resumeFile;
            fs.unlinkSync(oldFilePath);
            data['resumeFile'] = req.file.filename
        }
   
    try {
        const userUpdated = await usersModel.findByIdAndUpdate(data._id,data, { new: true });
        res.status(200).json({ message: 'Successfully Updated', statusCode: 200, userUpdated });
    } catch (error) {
        console.error(error);
       
            res.status(500).json({ error: "There was a serser side error." })
        
    }
})
module.exports = router