const User = require("../models/user");
const {v4:uuidv4} = require("uuid");
const {setUser,getUser} = require("../service/auth");
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    // checking validation for email ,password eg length of password
    //TODO
    //creating new user
    await User.create({
      name,
      email,
      password,
    });
    return res.render("login");
  } catch (error) {
    console.error("Error during Signup:", error);
    return res.status(500).send("Internal Server Error");
  }
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      console.log("invalid user credentials");
      res.render("login");
    } else {
      const sessionId = uuidv4(); // to create session id for each user
      setUser(sessionId,user);
      res.cookie("uid",sessionId)   
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};
