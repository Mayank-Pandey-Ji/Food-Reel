const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodpartner.model');


async function registerUser(req , res){
    const {fullName , email , password} = req.body;
    const isUUserAlreadyExist = await userModel.findOne({email});
    if(isUUserAlreadyExist){
        return res.status(400).json({
            message : "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const user = await userModel.create({
        fullName,
        email,
        password : hashedPassword
    });
    const token = jwt.sign({
        id : user._id,
    } , process.env.JWT_SECRET);
    res.cookie('token', token, {
    httpOnly: true,                       // hide from JS
    secure: process.env.NODE_ENV === 'production', // required for SameSite=None in prod
    sameSite: 'none',                     // must be NONE for cross-site cookies
    path: '/', 
    maxAge: 7 * 24 * 60 * 60 * 1000       // 7 days
    });
    return res.status(201).json({
        _id : user._id,
        fullName : user.fullName,
        email : user.email,
    })
}

async function loginUser(req , res){
    const {email , password} = req.body;
    const  user = await userModel.findOne({email});
    if(!user)
    {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }
    const ispasswordValid = await bcrypt.compare(password , user.password);
    if(! ispasswordValid)
    {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }
    const token = jwt.sign({
        id : user._id
    } , process.env.JWT_SECRET);

     res.cookie('token', token, {
        httpOnly: true,                       // hide from JS
        secure: process.env.NODE_ENV === 'production', // required for SameSite=None in prod
        sameSite: 'none',                     // must be NONE for cross-site cookies
        path: '/', 
        maxAge: 7 * 24 * 60 * 60 * 1000       // 7 days
        });
    res.status(200).json({
        message : "Login successful" , 
        user : {
            _id : user._id,
            fullName : user.fullName,
            email : user.email
        }
    })
}

async function logoutUser(req , res)
{
    res.clearCookie("token");
    res.status(200).json({
        message : "Logout successful"
    })
}

async function registerFoodPartner(req , res){
    const {name , email , password} = req.body;
    const isFoodPartnerExist = await foodPartnerModel.findOne({email}); 
    if(isFoodPartnerExist){
        return res.status(400).json({
            message : "Food Partner already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password : hashedPassword
    });
    const token = jwt.sign({
        id : foodPartner._id,
    } , process.env.JWT_SECRET);

    res.cookie('token', token, {
        httpOnly: true,                       // hide from JS
        secure: process.env.NODE_ENV === 'production', // required for SameSite=None in prod
        sameSite: 'none',                     // must be NONE for cross-site cookies
        path: '/', 
        maxAge: 7 * 24 * 60 * 60 * 1000       // 7 days
        });

    return res.status(201).json({
        message : "Food Partner registered successfully" ,
        foodPartner: {
        _id : foodPartner._id,
        name : foodPartner.name,
        email : foodPartner.email,
    }})
}

async function loginFoodPartner(req , res){
    const {email , password} = req.body;
    const foodPartner = await foodPartnerModel.findOne({email});    
    if(!foodPartner)
    {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }
    const ispasswordValid = await bcrypt.compare(password , foodPartner.password);
    if(! ispasswordValid)
    {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }
    const token = jwt.sign({
        id : foodPartner._id
    } , process.env.JWT_SECRET);
    res.cookie('token', token, {
        httpOnly: true,                       // hide from JS
        secure: process.env.NODE_ENV === 'production', // required for SameSite=None in prod
        sameSite: 'none',                     // must be NONE for cross-site cookies
        path: '/', 
        maxAge: 7 * 24 * 60 * 60 * 1000       // 7 days
        });
    res.status(200).json({
        message : "Login successful" , 
        foodPartner : {
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email
        }
    })
}

async function logoutFoodPartner(req , res)
{
    res.clearCookie("token");
    res.status(200).json({
        message : "Logout successful"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
} 