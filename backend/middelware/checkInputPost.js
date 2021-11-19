module.exports = (req, res, next) => {
    const { title, content } = req.body;
    const checkPostInput = (title, content) => {
      if (title == "" || content == "") {
        res.status(400).json({
          message: "Please fill all the fields !!!",
        });
      } else if (title.length >= 10 || content.length >= 255) {
        res.status(400).json({
          message: "Title must be at least 5 characters long and content must be at least 10 characters long",
        });
      } else {
        next();
      }
    };
    checkPostInput(title, content);
  };