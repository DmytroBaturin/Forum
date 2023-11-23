exports.isAuth = (req, res, next) => {
  try {
    if (req.session.isAuth) {
      next();
    } else {
      res.status(400).json({
        message: "You are not authorized",
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
