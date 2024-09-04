import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// SIGNUP CONTROLLER
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    // Save new user
    await newUser.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "you can't see the password because of privacy",
      },
    });

  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// LOGIN CONTROLLER
export async function login(req, res) {
    try {
      const {email,password} = req.body;
      if(!email || !password){
          return res.status(400).json({success:false,message:"All fields are required"})
      }

      const user = await User.findOne({email:email});
      if(!user){
        return res.status(400).json({success:false,message:"Invalid Credentials"});
      }
      const ispasswordCorrect = await bcrypt.compare(password,user.password);
      if(!ispasswordCorrect){
        return res.status(400).json({success:false,message:"Invalid Credentials"});
      }
      generateTokenAndSetCookie(user._id,res);
      res.status(200).json({success:true,user:{
          ...user._doc,
          password:""
      }})
  }
  catch (error) {
      console.log("Error in login controller",error.message);
      res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

// LOGOUT CONTROLLER
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-AI")
    res.status(200).json({success:true,message:"Logged out successfully"});
} 
catch (error) {
    console.log("Error in logout controller",error.message);
    res.status(500).json({success:false,message:"Internal Server Error"})
    
   }
}


