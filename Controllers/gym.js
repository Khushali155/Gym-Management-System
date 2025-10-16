const Gym = require('../Modals/gym')
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { userName, password, gymName, profilepic, email } = req.body;

        const isExit = await Gym.findOne({ userName });
        if (isExit) {
            res.status(400).json({
                error: "Username Already Exits , Please try with other username"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);
            const newGym = new Gym({ userName, password: hashedPassword, gymName, profilepic, email });
            await newGym.save();

            res.status(201).json({ message: 'user registered successfully', success: 'yes', data: newGym });
        }
    } catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

const  cookieOptions = {
    httpOnly:true,
    secure:false,//set to true in production
    sameSite:'Lax'
}

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;


        const gym = await Gym.findOne({ userName });

        if (gym && await bcrypt.compare(password,gym.password)) {

            const token = jwt.sign({gym_id:gym._id},process.env.JWT_SecretKey);

            res.cookie("cookie_token",token,cookieOptions);

            res.json({ message: 'Logged in successfully', success: "true", gym ,token});
        } else {
            res.status(400).json({ error: 'Invalid credential' });
        }
    } catch (err) {
        res.status(500).json({
            error: "server error"
        })

    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const gym = await Gym.findOne({ email });
        if (gym) {
            const buffer = crypto.randomBytes(4);//to get random bytes
            const token = buffer.readUInt32BE(0) % 900000 + 100000;
            gym.resetPasswordToken = token;
            gym.resetPasswordExpires = Date.now() + 3600000; //expire in 1 hour

            await gym.save();

            //for email sending
            const mailOptions = {
                from: 'khushalikumeriya@gmail.com',
                to: email,
                subject: 'password reset',
                text: `you requested a password reset . your OTP is : ${token}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ error: 'server error', errorMsg: error });
                } else {
                    res.status(200).json({ message: "OTP sent to your email" });
                }
            });

        } else {
            return res.status(400).json({ error: 'Gym not found' });
        }
    } catch (err) {
        res.status(500).json({
            error: "server error"
        })

    }
}

exports.checkOtp = async(req,res)=>{
    try {

        const {email,otp} = req.body;
        const gym = await Gym.findOne({
            email,
            resetPasswordToken:otp,
            resetPasswordExpires:{$gt:Date.now()}
        }) ;   
        
        if(!gym){
            return res.status(400).json({error:'OTP is invalid or has expired'});
        }
        res.status(200).json({message:"OTP is successfully verified"});

    } catch (err) {
        res.status(500).json({
            error: "server error"
        })
        
    }
}



exports.resetPassword = async(req,res)=>{
    try{
        const {email,newPassword} = req.body;
        const gym = await Gym.findOne({email});

        if(!gym){
            return res.status(400).json({error:'Some Technical issue ,Please try again later'});
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        gym.password = hashedPassword;
        gym.resetPasswordToken = undefined;
        gym.resetPasswordExpires = undefined;

        await gym.save();
        res.status(200).json({message:"password Reset Successfully"});

    }catch(err){
        res.status(500).json({
            error: "server error"
        });
    }
}

exports.logout = async(req,res)=>{
    res.clearCookie('cookie_token',cookieOptions).json({message:'Logged out successfully'});

}


