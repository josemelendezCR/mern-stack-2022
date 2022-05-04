const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

// Set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//Routes
app.use('/api/goals', require('./routes/goalRoutes'));

// Set server port
app.listen(port, () => console.log(`Server started on port ${port}`));