const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = (req, res, next) => {
      const token = req.cookies.access_token;
      if (!token) {
        return res.sendStatus(403)({ error: "Not allowed: requires token" });
      }
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        if (decodedToken) {
        next();
      }
      } catch {
        return res.sendStatus(403)({ error: "Not allowed : invalid token" });
      }
  
  
  };