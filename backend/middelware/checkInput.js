module.exports = (req, res, next) => {
  const { username } = req.body;
  const checkInput = (username) => {
    if (username == "") {
      res.status(400).json({
        message: "Please fill all the fields !!!",
      });
    } else if (username.length <= 3 || username.length >= 10) {
      res.status(400).json({
        message: "Username must to be between 3 to 10 caractres",
      });
    } else {
      next();
    }
  };
  checkInput(username);
};
