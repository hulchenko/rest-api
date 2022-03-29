require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to DB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Connected to DB`));

//setup JSON acceptance from server:
app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter); //'localhost:3000/users/{id} <-- will go into usersRouter

app.listen(3000, () => console.log(`Server is running`));
