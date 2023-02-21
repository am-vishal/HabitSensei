const Habit = require("../models/habitModel");

module.exports.home = (req, res) => {
  Habit.find({}, (err, habits) => {
    return res.render("home", {
      habits: habits,
    });
  });
};

//create new habit.
module.exports.create = (req, res) => {
  let today = new Date();
  let date = today.getDate();
  console.log(req.body);
  try {
    Habit.create(
      {
        description: req.body.habit,
        creation_date: date,
        days: ["None", "None", "None", "None", "None", "None", "None"],
        completed: 0,
        streak: 0,
      },
      (err, habit) => {
        if (err) {
          console.log("Error while creating Habit", err);
          return res.redirect("back");
        }
        console.log(habit);
        return res.redirect("back");
      }
    );
  } catch (error) {
    console.log("Error while creating Habit", error);
  }
};

//action for deleting habit
module.exports.delete = (req, res) => {
  let id = req.params.id;
  Habit.findByIdAndDelete(id, function (err, habit) {
    if (err) {
      console.log("error in deleting from database");
      return res.redirect("back");
    }
    console.log("Successfully deleted Habit");
    return res.redirect("back");
  });
};
