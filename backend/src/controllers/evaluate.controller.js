const EvaluateService = require("../services/evaluate.service");
const EvaluateServiceInstance = new EvaluateService();


const getTest = async (req, res) => {
  try {
    const result = await EvaluateServiceInstance.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Cannot get the test", error });
  }
};


const postEvaluate = async (req, res) => {
  const { username, Useranswer } = req.body;

  try {
    let finalAnswer=[],Totalscore=0;
    

    for(let data of Useranswer){
      const finalResult = await EvaluateServiceInstance.eval(
        data.Question_no,
        data.answer,
        data.score
      );
      Totalscore+=finalResult;
      const newibj = { ...data, ...{ score: finalResult } };
      finalAnswer.push(newibj)
    }

    const result = await EvaluateServiceInstance.createEvaluate(username,finalAnswer,Totalscore);
    
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: "Cannot get the evaluation", error });
  }
};

const getResult = async (req, res) => {
  try {
    const result = await EvaluateServiceInstance.findResult();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Cannot get the result", error });
  }
};

module.exports = { getTest, postEvaluate, getResult };
