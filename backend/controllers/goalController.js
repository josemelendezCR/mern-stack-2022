const db = require('../config/db');

const getGoals = (req, res) => {
  db.query('Select * from goal where userId = ?', [req.user.id], (err, result) => {
    if(err) {
      console.log('Error getting goals', err);
      throw err;
    }
    res.send(result);
  }); 
}

const createGoal = async (req, res) => {
  const { text } = req.body;
  db.query('Insert into goal (text, userId) values (?, ?)', [text, req.user.id], (err, result) => {
    if(err) {
      console.log('Error creating goal', err);
      throw err;
    }    
    res.status(200).send({ id: result.insertId, text, user: req.user.id });
  });
}

const updateGoal = async (req, res) => {
  const { text } = req.body;
  const { user } = req;
  const { id } = req.params;
  db.query('Update goal set text = ? where id = ? AND userId = ?', [text, id, user.id], (err, result) => {
    if(err) {
      console.log('Error updating goal', err);
      res.status(401);
      res.json(err);
      throw err;
    } else {
      res.status(200).send('Updated successful');
    }    
  })
}

const  deleteGoal = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    db.query('Delete from goal where id = ? AND userId = ?', [id, user.id], (err, result) => {
      if(err) {
        console.log('Error deleting goal', err);
        throw err;
      }
      res.status(200).send(id);
    });
  } catch(error) {
    console.log(error);
  }
  
}

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
}