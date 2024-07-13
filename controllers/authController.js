const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const signUp = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    bcryptjs;
    const user = await User.findOne({ where: { email } });
    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { signUp, login };
