const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const jwt=require('jsonwebtoken')
require('dotenv').config()
const users=require('./routes/users')
const jobs=require('./routes/jobs')
const appliedjob=require('./routes/appliedJob')


const app=express()
app.use(express.json())
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8sp76yj.mongodb.net/careersDB?retryWrites=true&w=majority`)
.then(()=>console.log('Succesfully conected with mongobd database.'))
  .catch(error => handleError(error));

app.get('/user',(req,res)=>{
    res.send('hello')
})

app.post('/jwt',(req,res)=>{
  const user=req.body
  console.log(user);
  const token=jwt.sign(user,process.env.SECRET_ACCESS_TOKEN,{
    expiresIn:"1h"
  })
  res.status(200).json({token})
})

app.use('/users',users)
app.use('/jobs',jobs)
app.use('/appliedjob',appliedjob)

app.listen(5000,()=>{
    console.log('App listening port is 5000');
})