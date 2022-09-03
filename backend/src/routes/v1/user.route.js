const router = require("express").Router();
const { postSignup,postLogin } = require("../../controllers/user.controller");

const {getTest, postEvaluate, getResult}= require("../../controllers/evaluate.controller")
const { userValidationSchema } = require("../../validations/user.validator");
const {loginBodyValidationSchema} =require("../../validations/login.validator")
const { validateSchema } = require("../../middlewares/validate.middleware");

const validateUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);

const passport = require("passport");
const authenticate = passport.authenticate("jwt", { session: false });

router.get("/test",authenticate, getTest);
router.get("/result",authenticate,getResult);
router.post("/evaluate",authenticate,postEvaluate);
router.post("/login", validateLogin, postLogin);
router.post("/signup",validateUser, postSignup);


module.exports = router;
