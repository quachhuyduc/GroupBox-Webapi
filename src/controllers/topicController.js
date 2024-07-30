const Topic = require('../models/topic');
const Task = require('../models/task');

const createTopic = async (req, res) => {
    try {
        const newTopic = new Topic(req.body);
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('tasks');
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).populate('tasks');
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTopic = async (req, res) => {
    try {
        const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTopic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.status(200).json(updatedTopic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTopic = async (req, res) => {
    try {
        const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
        if (!deletedTopic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addTaskToTopic = async (req, res) => {
    try {
        const { taskId } = req.body;
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (topic.tasks.includes(taskId)) {
            return res.status(400).json({ error: 'Task already added to this topic' });
        }

        topic.tasks.push(taskId);
        await topic.save();
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTasksByTopic = async (req, res) => {
    try {
        const topicId = req.params.id;
        const topic = await Topic.findById(topicId).populate('tasks'); // Tìm chủ đề và populate trường tasks

        if (!topic) {
            return res.status(404).json({ status: 'ERROR', message: 'Topic not found' });
        }

        return res.status(200).json({ status: 'OK', data: topic.tasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'ERROR', message: 'Unable to fetch tasks by topicId' });
    }
};

module.exports = {
    createTopic,
    getTopics,
    getTopicById,
    updateTopic,
    deleteTopic,
    addTaskToTopic,
    getTasksByTopic
};
