module.exports.home = async (req, res) => {
  try {
    return res.render("home");
  } catch (err) {
    return console.error("Error", err);
  }
};
