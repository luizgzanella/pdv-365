'use strict';
require('dotenv').config();
const http = require('http');
const App = require('./app');
const Server = http.Server(App);

const PORT = process.env.PORT || 3001;

Server.listen(PORT, () => console.log(`API rodando na porta: ${PORT}`));
