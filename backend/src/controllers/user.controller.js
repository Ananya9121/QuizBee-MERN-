const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();



const postSignup = async (req, res) => {
  try {
    const result = await UserServiceInstance.signup(req.body);
    res.status(200).json(result)

  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};

const postLogin = async (req, res) => {
  try {
      const data = req.body;
      const result = await UserServiceInstance.Login(data);
      if (result.isloggedIn) {
           res.status(200).json(result);
      }
      else {
           res.sendStatus(403)
      }

  } catch (error) {
      res.sendStatus(500).json(error);

  }
  
};


module.exports = { postSignup, postLogin };
