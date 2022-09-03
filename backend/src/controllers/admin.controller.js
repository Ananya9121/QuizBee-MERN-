const QuestionService = require("../services/admin.service");
const QuestionServiceInstance = new QuestionService();

const postQuestion = async (req, res) => {
  try {
    const result = await QuestionServiceInstance.createQuestion(req.body);
        res.sendStatus(200);

  } catch (error) {
    res.status(500).json({ message: "Failed to add the question", error });
  }
};

module.exports = { postQuestion };
