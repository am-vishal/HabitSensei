const HabitModel = require("../models/habitModel");
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Fetches weekly habit data and renders the weekly view
module.exports.fetchWeeklyData = (req, res) => {
  // Create an array of dates for the last 7 days
  const currentDate = new Date();
  const dateArray = [];
  for (let i = 0; i < 7; i++) {
    const date = currentDate.getDate() + "," + MONTH_NAMES[currentDate.getMonth()] + " " + currentDate.getFullYear();
    currentDate.setDate(currentDate.getDate() - 1);
    dateArray.push(date);
  }
  // Reverse the date array to show the dates in the correct order
  dateArray.reverse();
  // Fetch all habits from the database and update the habit data
  HabitModel.find({}, (error, habits) => {
    if (error) {
      console.log("Error while fetching data from Atlas DB", error);
      return res.redirect("/");
    }
    return res.render("weekly", {
      habits,
      days: dateArray,
    });
  });
};

// Export a function to update the status of a habit for a specific day
module.exports.updateHabitStatus = (req, res) => {
  // Retrieve the habit ID, day, and status from the request object
  const { id, day, status } = req.params;
  // Find the habit with the specified ID
  HabitModel.findById(id, (error, habit) => {
    if (error) {
      console.log(error);
      return res.redirect("back");
    }
    // Update the status of the habit for the specified day and save the changes
    habit.days[day] = status;
    habit.save();
    updateStreakAndCompleted(habit);
    return res.redirect("back");
  });
};

// Helper function to update the streak and completed values for a habit
const updateStreakAndCompleted = async (habit) => {
  try {
    let currentCompletedCount = 0;
    let maxStreakCount = 0;
    let currentStreakCount = 0;
    // Iterate over the days of the habit
    for (let i = 0; i < habit.days.length; i++) {
      if (habit.days[i] == "Done") {
        // If the day is completed, increment the completed count and current streak count
        currentCompletedCount++;
        currentStreakCount++;
      } else {
        // If the day is not completed, check if the current streak count is greater than the maximum streak count
        if (currentStreakCount > maxStreakCount) {
          // If it is, update the maximum streak count and reset the current streak count
          maxStreakCount = currentStreakCount;
          currentStreakCount = 0;
        } else {
          // Otherwise, just reset the current streak count
          currentStreakCount = 0;
        }
      }
    }
    // If the current streak count is greater than the max streak count, update the max streak count
    if (currentStreakCount > maxStreakCount) {
      maxStreakCount = currentStreakCount;
    }
    // Update the habit document in the database with the new streak and completed values
    await HabitModel.findByIdAndUpdate(habit.id, {
      streak: maxStreakCount,
      completed: currentCompletedCount,
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};
