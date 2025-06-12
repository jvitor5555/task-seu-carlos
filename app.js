const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.json());

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

app.use('/', authRoutes)
app.use('/', taskRoutes)

module.exports = app