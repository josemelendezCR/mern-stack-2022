const db = require('../config/db');

const getGoals = (req, res) => {
  db.query('Select * from goal', (err, result) => {
    if(err) {
      console.log('Error getting goals', err);
      throw err;
    }
    res.send(result);
  }); 
}

const createGoal = async (req, res) => {
  const { text } = req.body;
  db.query('Insert into goal (text) values (?)', [text], (err, result) => {
    if(err) {
      console.log('Error creating goal', err);
      throw err;
    }
    res.status(200).send('Goal added');
  });
}

const updateGoal = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  db.query('Update goal set text = ? where id = ?', [text, id], (err, result) => {
    if(err) {
      console.log('Error updating goal', err);
      throw err;
    }
    res.status(200).send('Updated successful');
  })
}

const  deleteGoal = async (req, res) => {
  const { id } = req.params;
  db.query('Delete from goal where id = ?', [id], (err, result) => {
    if(err) {
      console.log('Error deleting goal', err);
      throw err;
    }
    res.status(200).send('Deleted successful');
  });
}

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
}