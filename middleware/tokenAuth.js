const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
  req.user = null;
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, 'secret', (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        res.status(401).send({ error: 'Invalid User Token' });
      }
    });
  } else {
    res.status(401).send({ error: 'No User Token' });
  }
};

module.exports = tokenAuth;
