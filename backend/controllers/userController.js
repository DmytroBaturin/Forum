const Topic = require("../models/topics");
const Comments = require("../models/comments");
const Category = require("../models/category");

exports.createTopic = async (req, res) => {
  const { title, description, categoryIds } = req.body;
  try {
    const topic = new Topic({
      title,
      description,
      created_by: req.session.userInfo._id,
      categories: categoryIds,
    });
    await topic.save();

    const populatedTopic = await Topic.findById(topic._id)
      .populate("created_by", "username")
      .populate("categories");

    return res.status(200).json({
      message: "Topic created successfully",
      topic: populatedTopic,
    });
  } catch (error) {
    console.error("Error creating topic:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllTopic = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("created_by", "username")
      .populate("categories");
    return res.status(200).json(topics);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id)
      .populate("created_by", "username")
      .populate({
        path: "comments",
        populate: {
          path: "created_by",
          select: "username",
        },
      });
    if (topic) {
      return res.status(200).json({
        message: "Topic found successfully",
        topic: topic,
      });
    }
    return res.status(400).json({ message: "Not found" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addComment = async (req, res) => {
  const { topicId, commentText } = req.body;
  try {
    const comment = new Comments({
      text: commentText,
      created_by: req.session.userInfo._id,
    });
    await comment.save();
    const populatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { $push: { comments: comment._id } },
      { new: true },
    )
      .populate("created_by", "username")
      .populate({
        path: "comments",
        populate: {
          path: "created_by",
          select: "username",
        },
      });
    return res.status(200).json({
      message: "Comment created successfully",
      topic: populatedTopic,
    });
    if (!populatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id).lean();
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    await Topic.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Topic deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
