import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import validator from 'validator';



//function for creating Token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Controller function for user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate token
            const token = createToken(user._id);
    
            res.json({ success: true,message:"User Login Successfully" , token });
        }else{
            return res.json({ success: false, message: 'Invalid Password' });

        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};








//Controller function for user Register 
const registerUser =async(req,res)=>{
  try {
    const {name,email,password} = req.body
    //Checking if user is already exist
    const exists = await userModel.findOne({email})
    if(exists){
      return res.json({success:false ,message:'User already exist'})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false, message:'Invalid Email'})
    }

    if(password.length < 8){
       return res.json({success:false, message:'Password should be at least 8 characters long'})
    }


    //Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({success:true,message:"User Register Successfully",token})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//Controller function for Admin login 
const loginAdmin = async (req, res) => {
    try {
        const {email,password} = req.body;
        

        console.log("Input Email:", email);
        console.log("Input Password:", password);
        console.log("Env Email:", process.env.ADMIN_EMAIL);
        console.log("Env Password:", process.env.ADMIN_PASS);

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign( email + password , process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export {loginUser,registerUser,loginAdmin}

