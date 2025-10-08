const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const accounts = [
    { email: process.env.EMAIL, password: process.env.PASSWORD },
    { email: process.env.EMAIL2, password: process.env.PASSWORD2 },
  ];

  const user = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (user) {
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
  maxAge: 2 * 24 * 60 * 60 * 1000, 
});

    return res.status(200).json({
      success: true,
      message: "Sign-in successful",
      token,
      user: { email: user.email }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }
});

router.post('/logOut',(req,res)=>{
  res.clearCookie('token',{
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }).json({message:'logged out successfully'})
 
})



module.exports = router