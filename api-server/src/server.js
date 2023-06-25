'use strict';

require('dotenv').config();
const express = require('express');

// 3rd Party Resources
const cors = require('cors');
const morgan = require('morgan');


// Esoteric Resources
const authRoutes = require('./routes/route');

const app = express();

app.use(express.json());

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(authRoutes);



const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');

const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');



app.use(logger);

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);


app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      if (!port) { throw new Error('Missing Port'); }
      console.log(`Server Up on ${port}`);
    });
  },
};


