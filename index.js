const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
require('dotenv').config()
const users=require('./routes/users')
const jobs=require('./routes/jobs')


const app=express()
app.use(express.json())
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8sp76yj.mongodb.net/careersDB?retryWrites=true&w=majority`)
.then(()=>console.log('Succesfully conected with mongobd database.'))
  .catch(error => handleError(error));

app.get('/user',(req,res)=>{
    res.send('hello')
})

app.use('/users',users)
app.use('/jobs',jobs)

app.listen(5000,()=>{
    console.log('App listening port is 5000');
})