const Joi = require("joi");

const Questions = Joi.object().keys([{
  Question: Joi.string().required(),
  Option1: Joi.string().required(),
  Option2: Joi.string().required(),
  Option3: Joi.string().required(),
  Option4: Joi.string().required(),
  Dificulty: Joi.number().required(),
  Correct: Joi.string().required(),
}]);

module.exports = {
  Questions,
};
