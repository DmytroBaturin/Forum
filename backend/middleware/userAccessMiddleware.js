const Topic = require('../models/topics');
const Role = require("../models/role");
const middleware = require("./roleMiddleware");

const isTopicCreator = async (req, res, next) => {
        const topicId = req.params.id;
        try {
                const userRoles = req.session.userInfo.roles.map(role => role.toString());
                const validRoles = await Role.find({ role: { $in: ["ADMIN"] } });
                const hasValidRole = validRoles.some(validRole => userRoles.includes(validRole._id.toString()));
                const topic = await Topic.findById(topicId);
                if (!hasValidRole && topic.created_by.toString() !== req.session.userInfo._id.toString()) {
                        return res.status(401).json({ message: 'You dont have permission' });
                        }
                if(!topic){
                        return res.status(401).json({message: 'Topic not found'})
                }
                next();
        } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
        }
};

module.exports = isTopicCreator;
