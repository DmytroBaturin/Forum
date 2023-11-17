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

exports.createRole = async (req, res) => {
    try {
        const { rolename } = req.body;
        const role = User.create(rolename);
        await role.save();
        return res.status(200);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
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
