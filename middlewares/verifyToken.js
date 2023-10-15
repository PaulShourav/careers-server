const express = require('express')
const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
console.log('hiting the verify token');
next()
}

module.exports=verifyToken