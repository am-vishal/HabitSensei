const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const habit = require("./habit");

router.get("/", homeController.home);
router.post("/create", homeController.create);
router.get("/delete/:id", homeController.delete);

router.use("/habit", habit);

module.exports = router;
