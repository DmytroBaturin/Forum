const Role = require("../models/role");

exports.rolemiddleware = (requiredRoleNames) => {
  return async function (req, res, next) {
    if (!req.session || !req.session.userInfo || !req.session.userInfo.roles) {
      return res.status(401).json({
        message: "You do not have the necessary roles for this action",
      });
    }
    try {
      const userRoles = req.session.userInfo.roles.map((role) =>
        role.toString(),
      );
      const validRoles = await Role.find({ role: { $in: requiredRoleNames } });
      const hasValidRole = validRoles.some((validRole) =>
        userRoles.includes(validRole._id.toString()),
      );
      if (hasValidRole) {
        return next();
      } else {
        return res.status(403).json({ message: "Not access" });
      }
    } catch (error) {
      console.error("Role middleware error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
