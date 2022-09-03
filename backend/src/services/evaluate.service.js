const Evaluate = require("../models/evaluate.model");
const Questions = require("../models/question.model");


class EvaluateService {

  createEvaluate = async (username,finalAnswer,Totalscore) => {
    try {
     
      const newEvaluate = new Evaluate({username,finalAnswer,Totalscore });
      const result = await newEvaluate.save();      
      return result;
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
    const CorrectAnswer= Number(questionCorrect.Correct);
    if(answer===CorrectAnswer) {
      return score=5;
    }
    else return score=-2;

  }

  findResult= async () => {
    const userResult = await Evaluate.find({});
    return userResult;
  };
}

module.exports = EvaluateService;
