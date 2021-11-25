const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = (req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
        return res.status(403).json({ error: "Requires token" });
      }
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        if (!decodedToken) {
          res.status(401).json({
            message: "Token invalid",
          });
        } else if (decodedToken.id || decodedToken.isAdmin === true) {
          next();
        }
      } catch {
        return res.status(403).json({ error: "Invalid token" });
      }
  
  
  };