const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token)
      res.status(401).json({
        err: 1,
        message: "access token error",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, success) => {
      if (err)
        res.status(401).json({
          err: 1,
          message: "access token error",
        });
      const { user } = success;
      req.user = user;
      next();
    });
  } catch (error) {}
};

module.exports = verifyToken;
