const feedbackService = require('../services/feedbackService.js');

const submitFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    const feedback = await feedbackService.createFeedback(feedbackData);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

module.exports = {
  submitFeedback,
};
