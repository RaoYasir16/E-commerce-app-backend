const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



// Send verification link in email
const sendVerificationEmail = async (email, userId) => {
    const secretkey = process.env.JWT_KEY;

    const token = jwt.sign(
        { id: userId },
        secretkey,
        { expiresIn: "1h" }
    );

    const verificationLink = `${process.env.HOST_URL}/verify-email/${token}`;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: "yasirmajeed515@gmail.com",
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click the link to verify your email: <a href="${verificationLink}"><button>Verify</button></a></p>`
    });
};


//Add user and call verification email function
const addUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            role: role || "user",
            isverified: false
        });

        // Send email verification
        await sendVerificationEmail(email, user._id);

        return res.status(201).json({
            message: "User created and verification email sent",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isverified: user.isverified
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



// When User Click on link the IsVerified = false to isVerified = true in Database
const veryfiyEmail = async(req,res)=>{
    try {
        const {token} = req.params;
        const secretkey = process.env.JWT_KEY;
    const decoded = jwt.verify(token,secretkey);

    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }

    if(user.isverified){
        return res.status(400).json({
            message:"Email already Verified"
        });
    }

    user.isverified = true
    await user.save();
    return res.status(200).json({
        message:"Email verified successfully"
    })
    } catch (error) {
        return res.status(400).json({
            message:"Invalid or Expire token"
        })
    }
}


//Login user
const loginUser = async(req,res)=>{
    try {
        
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message:"Email or Password are required"
            })
        }
        const   user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid Credentials"
            });
        }

        if(!user.isverified){
            return res.status(403).json({
                message:"Pleas verify your Eamil first"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_KEY,
            {expiresIn:"7d"}
        );

        res.status(200).json({
            message:"Login Successfully",
            token
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//Forget Password....Send email for forget the password
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not Found"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "15m" }
        );

        const resetLink = `${process.env.HOST_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset your Password",
            html: `<p>Click here to reset your Password: 
                   <a href="${resetLink}"><button>Reset Password</button></a></p>`
        });

        return res.status(200).json({
            message: "Forget password link sent to the email. Please check your inbox."
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//Reset password(First check token and then reset password)
const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params;
        const { password }= req.body;

        if(!password){
            return res.status(400).json({
                message:"New password Required"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                message:"User not find"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword
        await user.save();
        return res.status(200).json({
            message:"Password reset Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = { addUser ,veryfiyEmail,loginUser,forgetPassword,resetPassword };
