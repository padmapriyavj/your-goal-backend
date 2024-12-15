const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.signupService = async (userDetails) => {
    try {
      console.log("SignupService called with userDetails:", userDetails); 
      const user = new User(userDetails);
      const savedUser = await user.save(); 
      console.log("User successfully created:", savedUser); 
      return { success: true, user: savedUser };
    } catch (error) {
      console.error("Error in signupService:", error); 
      throw error; 
    }
  };
  

module.exports.loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { success: true, token, user };
  } catch (error) {
    console.error('Error in loginService:', error);
    throw error;
  }
};

module.exports.editUserService = async (userId, updates) => {
    try {
        const updateData = {};

        if (updates.username) {
            updateData.username = updates.username;
        }
        if (updates.email) {
            updateData.email = updates.email;
        }
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updates.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true, 
            runValidators: true, 
        });

        return updatedUser;
    } catch (error) {
        console.error('Error in editUserService:', error);
        throw error;
    }
};
