const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
      const { firstName, lastName, email, bio, password } = req.body;
      //check payload
      if (!firstName || !lastName || !email || !bio || !password) {
        res.status(400).json({ message: "All fields are required", data: [] });
        return;
      }
      // check if email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: "User already exists", data: [] });
        return;
      }
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // create new user
      const user = new User({
        firstName,
        lastName,
        email,
        bio,
        password: hashedPassword,
      });
      // save user
      const newUser = await user.save();
      let resUser = newUser.toJSON();
      delete resUser.password;
      res.status(201).json({ message: "New user created!", data: resUser });
    } catch (error) {
      res.status(500).json({ message: error.message, data: [] });
    }   
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // check payload
      if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      // check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "User does not exist" });
        return;
      }
      // check if password is correct w/ hash
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      let resUser = user.toJSON();
      delete resUser.password;
      res.status(200).json({ message: "Login successful!", data: resUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };