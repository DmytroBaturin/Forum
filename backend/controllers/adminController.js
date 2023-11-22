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
        const { userId, roleToGive } = req.body;
        const user = await User.findById(userId);
        const role = await Role.findById(roleToGive);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.roles.includes(roleToGive)) {
            return res.status(409).json({ message: 'User already has this role' });
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $push: { roles: roleToGive } },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({
            message: 'Role was given',
            updateUser: updateUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
