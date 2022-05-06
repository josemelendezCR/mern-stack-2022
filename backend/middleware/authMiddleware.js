const jwt = require('jsonwebtoken');
const db = require('../config/db');

const protect = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      db.query("Select id, name, email from user where id = ?", [decoded.id], (err, result) => {
        if(result.length > 0) {
          req.user = result[0];
          next();
        } else {
          console.log('ERROR DECODING:', error);
          res.status(401);
          res.send(error);
        }        
      });
    } catch(error) {
      console.log('ERROR DECODING:', error);
      res.status(401);
      res.json(error);
    }
  }
  if(!token) {
    res.status(401);
    res.send('No token');
    throw new Error('Not authorized');
  }
}

module.exports = { protect };