const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password; // Assuming passwords are stored in plain text for testing purposes
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role, 
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res
      .status(200)
      .json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
