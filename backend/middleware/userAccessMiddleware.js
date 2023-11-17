// middleware/isTopicCreator.js
const Topic = require('../models/topics');

const isTopicCreator = async (req, res, next) => {
        const topicId = req.params.id;
        try {
                const topic = await Topic.findById(topicId);
                if(topic.created_by.toString() !== req.session.userInfo._id.toString()){
                     return res.status(401).json({message: 'You dont have permission'})
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
