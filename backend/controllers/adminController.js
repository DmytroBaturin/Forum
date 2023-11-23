const User = require('../models/user');
const Role = require('../models/role');
const Topic = require('../models/topics');

exports.deleteAllData = async (req, res) => {
    try {
        await User.deleteMany();
        res.status(201).json(User);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteAllTopics = async (req, res) => {
    try {
        await Topic.deleteMany();
        res.status(201).json({ message: 'All topics deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        const { userId } = req.body
        const user = req.session.userInfo._id
        const userForDelete = await User.findById(userId)
        if(userId.toString() === user.toString()){
            return res.status(404).json({message: "Your profile cannot be deleted"});
        }
        if(!userForDelete) {
            return res.status(404).json({message: "User not found"});
        }
        await User.findByIdAndDelete(userId)
        return res.status(200).json({
            message: "User deleted",
            user: userId
        });
    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.createRole = async (req, res) => {
    try {
        const { rolename } = req.body;
        const role = await Role.create(rolename);
        await role.save();
        return res.status(200);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const users = await Role.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.giveRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const user = await User.findById(userId);
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.roles.includes(roleId)) {
            return res.status(409).json({ message: 'User already has this role' });
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $push: { roles: roleId } },
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userWithPopulatedRoles = await User.findById(userId).populate('roles');
        res.status(201).json({
            message: 'Role was given',
            updateUser: userWithPopulatedRoles
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const userSession = req.session.userInfo._id
        const user = await User.findById(userId);
        if(userId.toString() === userSession.toString()){
            return res.status(404).json({message: "Your role cannot be deleted"});
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.roles.includes(roleId)) {
            return res.status(404).json({ message: 'Role not found for this user' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { roles: roleId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userWithPopulatedRoles = await User.findById(userId).populate('roles');

        res.status(200).json({
            message: 'Role deleted successfully from user',
            user: userWithPopulatedRoles
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
