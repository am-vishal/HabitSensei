const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habitsController");

router.get("/weekly", habitsController.fetchWeeklyData);
router.get("/update/:id/:day/:status", habitsController.updateHabitStatus);

module.exports = router;
