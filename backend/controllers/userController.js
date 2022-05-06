const  db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      res.status(400);
      throw new Error('Please add fields required');
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Add new User to DB
    db.query('Insert into user (name, email, password) values (?, ?, ?)', [name, email, hashPassword], (err, result) => {
      if(err) {
        res.status(400);
        res.send(err.sqlMessage);
        throw new Error(err);
      }
      res.status(200);
      res.json({ name, email, id: result.insertId, token: generateToken(result.insertId) });
    });
  } catch(e) {
    console.log('Error register user', e);
  }
}

const loginUser = async  (req, res) => {  
  const { email, password } = req.body;
  db.query("Select * from user where email = ?", [email], async (err, result) => {
    try {
      if(result.length > 0 && await bcrypt.compare(password, result[0].password)) {
        res.json({
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          token: generateToken(result[0].id),
        })
      } else {
        res.status(400);
        res.send("ERROR: Invalid credentials")
        throw new Error('Invalid credentials');
      }
    } catch(e) {
      console.log('Error login user:', e);
    }   
  });
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}

const getUser = (req, res) => {
  const { id, name, email } = req.user;
  res.status(200).json({ id, name, email }); 
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
}