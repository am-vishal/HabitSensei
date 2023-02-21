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

    updateHabitData(habits);

    return res.render("weekly", {
      habits,
      days: dateArray,
    });
  });
};

// Updates the status of a habit
module.exports.updateHabitStatus = (req, res) => {
  const habitId = req.params.id;
  const day = req.params.day;
  const status = req.params.status;
  HabitModel.findById(habitId, (error, habit) => {
    if (error) {
      console.log(error);
      return res.redirect("back");
    }
    habit.days[day] = status;
    habit.save();
    updateStreakAndCompleted(habit);
    return res.redirect("back");
  });
};

// Updates the streak and completed values for a habit
const updateStreakAndCompleted = async (habit) => {
  try {
    let currentCompletedCount = 0;
    let maxStreakCount = 0;
    let currentStreakCount = 0;
    for (let i = 0; i < habit.days.length; i++) {
      if (habit.days[i] == "Done") {
        currentCompletedCount++;
        currentStreakCount++;
      } else {
        if (currentStreakCount > maxStreakCount) {
          maxStreakCount = currentStreakCount;
          currentStreakCount = 0;
        } else {
          currentStreakCount = 0;
        }
      }
    }
    if (currentStreakCount > maxStreakCount) {
      maxStreakCount = currentStreakCount;
    }
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

// Updates habit data if required
const updateHabitData = (habits) => {
  const currentDayOfMonth = new Date().getDate();

  for (const habit of habits) {
    const daysSinceCreation = currentDayOfMonth - habit.creation_date;

    if (daysSinceCreation > 0 && daysSinceCreation < 8) {
      for (let i = daysSinceCreation, j = 0; i < habit.days.length; i++, j++) {
        habit.days[j] = habit.days[i];
      }
      // Calculate number of remaining days in the week
      const remainingDays = habit.days.length - daysSinceCreation;

      // Calculate number of habits that have been completed this week
      let habitsCompleted = 0;
      for (let i = daysSinceCreation; i < habit.days.length; i++) {
        if (habit.days[i] === "Done") {
          habitsCompleted++;
        }
      }

      // Calculate percentage of habits completed this week
      const habitsCompletedPercentage = Math.round((habitsCompleted / remainingDays) * 100);

      // Render the dashboard template with the habit data and calculated values
      res.render("dashboard", {
        habit: habit,
        daysSinceCreation: daysSinceCreation,
        remainingDays: remainingDays,
        habitsCompleted: habitsCompleted,
        habitsCompletedPercentage: habitsCompletedPercentage,
      });
    }
  }
};