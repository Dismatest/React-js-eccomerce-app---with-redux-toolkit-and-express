const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../../models/User");

//register

const registerUser = async (req, res) => {

    const { userName, email, password } = req.body;

    try{

        const checkUser = await User.findOne({email})
        if(checkUser) return res.json({success: false, message: 'The email is already taken. Please try again'})
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User created successfully'
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'There was an error'
        })
    }
}


//login

const loginUser = async (req, res) =>{
    const { email, password } = req.body;

    try{

        const checkUser = await User.findOne({email});
        if(!checkUser) return res.json({success: false, message: "User doesn't exist, please register."})

        const checkPassMatch = await bcrypt.compare(password, checkUser.password)
        if (!checkPassMatch) return res.json({success: false, message: "Passwords do not match, please try again."})

        //create the token and store it in the cookie and send the response back to the client with the user data
        const token = jwt.sign({
            id: checkUser._id, 
            role: checkUser.role,
            userName: checkUser.userName,
            email: checkUser.email
        }, 'CLIENT_SECRET_KEY', {expiresIn: '60m'})

        //set the token in the cookie with the name of token and the value of the token
        //I can also send the user token using response headers
        //res.setHeader('Authorization', `Bearer ${token}`)

        res.cookie('token', token, {httpOnly: true, secure: false}).json({
            success: true, message: 'Login successful', 
            user: {
            email: checkUser.email,
            userName: checkUser.userName,
            role: checkUser.role,
            id: checkUser._id
        }
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'There was an error'
        })
    }
}

//logout

const logoutUser = async (req, res) =>{

    res.clearCookie('token').json({
        success: true,
        message: 'Logout successful'
    })
}


//auth middleware to check some actions like when the user refresh the page

const authMiddleware = async (req, res, next) =>{
    // const token = req.cookies.token;
    // getting the token sent in the response headers
    // const {token} = req.headers.authorization.split(' ')[1];
    const {token} = req.cookies;
    if(!req.cookies) return res.status(401).json({success: false, message: 'No cookies found'})
    if(!token) return res.status(401).json({success: false, message: 'You are not logged in'})
    
    try{
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({
            success: false,
            message: 'There was an error'
        })
    }
        
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware  
}