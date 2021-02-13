'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./config/database');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
/* app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public')); */
app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);

module.exports = app;
