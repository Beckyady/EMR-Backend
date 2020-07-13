const express =require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var router = express.Router();
const mongoose = require('mongoose');

const Employee = mongoose.model('Employee');
const isAuth = require('../middleware/is-auth').isAuth;


router.get('/', (req,res) => {
    res.json({
        message: 'Welcome to Post'
    });
});

router.get('/current-user', isAuth, async (req, res) =>  {
    const user = await Employee.findById(req.userId);
    res.status(200).json({user});
})



router.post('/', async (req,res) => {
    const email = req.body.email;
    const user = await Employee.findOne({ staffEmail: email });
    if (!user) {
        res.status(404).json('User does not exist');
        return;
    }
    const pwdEquaqlity = await bcrypt.compare(req.body.password, user.password);
    if (!pwdEquaqlity) {
        res.status(422).json('Password is wrong');
        return;
    }
    
    jwt.sign({ userId: user._id.toString() }, 'secretkey', { expiresIn: '1h' }, (err,token ) => {
        res.json({
            token : token
        })
    })
    });

//verifyToken
function verifyToken(req,res,next) {
    //get the auth  header value
    const bearerHeader = req.get['Authorization'];
    //check if iberer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        //Forbidden
        res.sendStatus(403)
    }
}


module.exports = router;