const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model")


async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(400).json({ message: "Username or email already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, )
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req,res){
    const {email,password} = req.body;
    const existingUser = await userModel.findOne({email})
    if(!existingUser){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const ispasswordValid = await bcrypt.compare(password,existingUser.password);
    if(!ispasswordValid){
        return res.status(400).json({message:"Invalid email or password"})
    }
     const token = jwt.sign(
    { id: existingUser._id, username: existingUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, )

  res.status(200).json({
    message:"Login successful",
    user:{
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
    }
  })
}

async function logoutUser(req,res){
    const token = req.cookies.token

  if(!token){
    return res.status(400).json({message:"No token found"})
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const blacklistToken  = await blacklistTokenModel.create({
    token,
    username:decoded.username
})
  res.clearCookie("token")
  res.status(200).json({message:"Logout successful",
    username:decoded.username
  })

}


async function getuserprofile(req,res){
    const user = await userModel.findById(req.user.id)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getuserprofile
};
