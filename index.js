'use strict';
require('dotenv').config();

const { db } = require('./api-server/src/models/index');
const server = require('./api-server/src/server.js');
const port = process.env.PORT  || 3030;
db.sync().then(() => {
  server.start(port);
});
