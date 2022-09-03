const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const adminRoute = require("./admin.route");

router.use("/user", userRoutes);
router.use("/admin", adminRoute);


module.exports = router;
