const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')
const { registerValidator } = require('../validator/User.validator');
const { validationResult } = require('express-validator');


//html file render
router.get('/register',(req,res)=>{
    res.render('register');
})
 
//create data in database
router.post('/register-data', registerValidator   ,async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    

    const {username,email,password} = req.body;
    
     await userModel.create({
        name:username,
        email:email,
        password :password
    })
    res.send('data received');
    console.log(req.body);
    
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
        name: "punit"
    },{
        email : "punit000@gmail.com"
    })
    res.send('data updated');
})

//delete data from database
router.get('/delete-user/:name',async(req,res)=>{
    
    const userN = req.params.name;

      await userModel.findOneAndDelete({
        

        name: userN
    })
    res.send(`User ${userN} deleted`);
})

module.exports = router;