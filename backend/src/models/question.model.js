const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema([{
  Question_no: {type: Number},
  Question: {type: String},
  Option1: {type: String},
  Option2: {type: String},
  Option3: {type: String},
  Option4: {type: String},
  Dificulty: {type: Number},
  Correct: {type: String,}
}]);

const questionModel = mongoose.model("Questions", QuestionSchema);

module.exports = questionModel;
