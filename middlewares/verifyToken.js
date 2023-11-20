const express = require('express')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const authorizatication = req.headers.authorizatication
    if (!authorizatication) {
        res.status(401).send({ error: true, message: 'Unauthorized access' })
    }
    const token = authorizatication.split(' ')[1]
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, decoded) => {
        if (error) {
            res.status(403).send({ error: true, message: 'Unauthorized access' })
        }
        req.decoded = decoded
        next()
    })
}

module.exports = verifyToken