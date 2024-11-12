// services/feedbackService.js
const Feedback = require('../models/Feedback.js');

const createFeedback = async (feedbackData) => {
  try {
    return await Feedback.create(feedbackData);
  } catch (error) {
    throw new Error('Error creating feedback');
  }
};

module.exports = {
  createFeedback,
};
