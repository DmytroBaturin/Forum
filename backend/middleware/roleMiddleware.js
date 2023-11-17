const Role = require('../models/role')

exports.rolemiddleware = (roles) => {
    return async function (req, res, next) {
        try {
            const userRole = await Role.findById(req.session.userInfo.roles);
            if (userRole && roles.includes(userRole.role)) {
                next();
            } else {
                res.status(403).json({ message: 'No access' });

            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while checking the user role' });
        }
        }
};
