const jwt = require('jsonwebtoken');

const authenticateJWT = (role = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1];
  
        jwt.verify(accessToken, `${process.env.JWT_SECRET_KEY}`, (err, user) => {
            if (err) {
              return res.sendStatus(401);
            }
            req.user = user;
            role.forEach(r => {
              if (user.role === r) {
                next();
              } else {
                res.sendStatus(403);
              }
            });
          });
    } else {
        res.sendStatus(401);
    }
  };
}

module.exports = authenticateJWT;