const Admin = require('../models/adminModel');
const User = require('../models/userModel');

// Admin and User Login


const login = async (req, res) => {
  const { role, username, password } = req.body;

  try {
    if (role === 'admin') {
      // Check for admin credentials
      const admin = await Admin.findOne({ username, password });
      if (admin) {
        return res.status(200).json({
          message: 'Admin login successful',
          adminId: admin._id, // Include adminId in the response
        });
      } else {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }
    } else if (role === 'user') {
      // Check for user credentials
      const user = await User.findOne({ username, password });
      if (user) {
        return res.status(200).json({
          message: 'User login successful',
          userId: user._id, // Include userId in the response
        });
      } else {
        return res.status(401).json({ message: 'Invalid user credentials' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};




// Admin Registration
const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  const newAdmin = new Admin({ username, email, password });
  try {
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err });
  }
};

 //user Registration
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    const newUser = new User({ username, email, password });
    try {
      await newUser.save();
      res.status(201).json({ message: 'user registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err });
    }
  };


  const displayUser=async(req,res)=>{
    const mydata=await  User.find();
    res.status(200).json(mydata);
}



module.exports = { login, registerAdmin ,registerUser,displayUser};

// const login = async (req, res) => {
//   const { role, username, password } = req.body;

//   if (role === 'admin') {
//     const admin = await Admin.findOne({ username, password });
//     if (admin) return res.status(200).json({ message: 'Admin login successful' });
//     else return res.status(401).json({ message: 'Invalid admin credentials' });
//   }
//   else if (role === 'user') {
//     const user = await User.findOne({ username, password });
//     if (user) return res.status(200).json({ message: 'User login successful' });
//     else return res.status(401).json({ message: 'Invalid user credentials' });
//   } else {
//     res.status(400).json({ message: 'Invalid role' });
//   }
// };

