const mongoose = require("mongoose");

const EvaluteSchema = mongoose.Schema({
    username: { type: String, unique: true, lowercase: true, required: true },
    finalAnswer:[{Question_no:Number,answer:String,score:Number}],
    Totalscore: {type: Number,required: true},
});

const evaluateModel = mongoose.model("Evaluate", EvaluteSchema);

module.exports = evaluateModel;
