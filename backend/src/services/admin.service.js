const Questions = require("../models/question.model");

class QuestionService {

  createQuestion = async (questiondata) => {
    try {
    questiondata.forEach(async(question)=>{
      const { Question_no,Question, Option1,Option2,Option3,Option4,Dificulty,Correct } = question;
      const newQuestion = new Questions({ Question_no,Question, Option1,Option2,Option3,Option4,Dificulty,Correct });

      const result = await newQuestion.save();
    })
      
      return true;
    } catch (error) {
      throw error;
    }
  }; 

  findAll = async () => {
    const questionResult = await Questions.find({});
    return questionResult;
  };


  eval = async(Question_no,answer,score)=>{
    const questionCorrect= await Questions.findOne({ Question_no });
    const CorrectAnswer= questionCorrect.Correct;
    if(answer===CorrectAnswer) {
      return score=5;
    }
    else return score=-2;

  }
}

module.exports = QuestionService;
