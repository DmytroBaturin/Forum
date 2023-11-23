const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");

exports.registration = async (req, res) => {
  try {
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });
    const userRole = await Role.findOne({ role: "USER" });
    if (!userRole) {
      return res.status(500).json({ message: "User Role not found" });
    }
    if (candidate) {
      return res.status(409).json({ message: "Username already registered" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    let user = new User({
      username,
      password: hashedPassword,
      roles: [userRole._id],
    });
    await user.save();
    user = await User.findById(user._id).populate("roles", "role");
    req.session.isAuth = true;
    req.session.userInfo = user;
    return res.status(201).json({
      message: "User registration successful",
      user: { username: user.username, roles: user.roles },
      isAuth: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate("roles");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    } else {
      req.session.isAuth = true;
      req.session.userInfo = user;
      return res.status(200).json({
        message: "Login successful",
        user: { username: user.username, roles: user.roles },
        isAuth: true,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json({
        message: "Logout successful",
        isAuth: false,
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkSession = async (req, res) => {
  try {
    if (req.session.isAuth) {
      const user = await User.findById(req.session.userInfo._id).populate(
        "roles",
      );
      res.status(200).json({ isAuth: true, user: user });
    } else {
      res.status(200).json({ isAuth: false });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
