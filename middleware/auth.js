const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log("auth middleware");
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log("req.body", req.body);
    console.log("req.body.userId", req.body.userId);
    console.log("token", token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};