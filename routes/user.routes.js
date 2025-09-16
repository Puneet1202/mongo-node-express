const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

//html file render
router.get('/register',(req,res)=>{
    res.render('register');
})
 
//create data in database
router.post('/register-data',async(req,res)=>{

    const {username,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);

     await userModel.create({
        name:username,
        email:email,
        password :hashPassword
    })
    res.send('data received');
})



//read data from database
router.get('/users',(req,res)=>{
    userModel.find({
        name: "nivi"
    }).then((data)=>{
        res.send(data);
    })
})


//update data in database
router.get('/update-user', async(req,res)=>{
    await userModel.findOneAndUpdate({
        name: "harshit"
    },{
        email : "harshit000@gmail.com"
    })
    res.send('data updated');
})

//delete data from database
router.get('/delete-user',async(req,res)=>{
    await userModel.findOneAndDelete({
        name: "harshit"
    })
    res.send('data deleted');
})

module.exports = router;