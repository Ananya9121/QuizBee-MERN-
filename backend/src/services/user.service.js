const Users = require("../models/user.model");

const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");

class UserService {
  secret = process.env.JWT_SECRET;


  register = async (user) => {
    try {
      const { email, username, password } = user;
      const newUser = new Users({ email, username, password });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  findByUsername = async (username) => {
    try {
      const userResult = await Users.findOne({ username });
      return userResult;
    } catch (error) {
      throw error;
    }
  };

  
  signup = async (userBody) => {
    try {
      const hashedPassword = await this.encryptPassword(userBody.password);
    await this.register({...userBody,password:hashedPassword});
    } catch (error) {
      throw error;
    } 
  };

 
  encryptPassword = async (password) => { 
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  generateToken = (userId) => { 
    const payload = { userId };
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, this.secret, options);
    return token;
  };

  Login = async (userData) => {
    const user = await this.findByUsername(userData.username);
    if (!user) return { isloggedIn: false };
    const verifyPassword = await bcrypt.compare(userData.password, user.password);

    if (!verifyPassword) return {isloggedIn:false};
    this.generateToken(user._id)
    return {isloggedIn:true
      ,jwt:this.generateToken(user._id),username:userData.username
    };
  }
}

module.exports = UserService;
