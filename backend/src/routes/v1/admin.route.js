const router = require("express").Router();

const { Questions } = require("../../validations/question.validator");
const { validateSchema } = require("../../middlewares/validate.middleware");

const {postQuestion}= require("../../controllers/admin.controller")

const validateQuestion=validateSchema(Questions)


router.post("/", postQuestion);


module.exports = router;