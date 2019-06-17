'use strict';

//signup: echo '{"username":"name","password":"pass"}' | http post :3000/signup
//signin: http post :3000/signin -a username:password

/**
 * API Server Module
 * @module src/app
 */

const cwd = process.cwd();
require('dotenv').config();

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swagger = require('swagger-ui-express');
const swaggerDocs = require('./docs/config/swagger.json');

// Esoteric Resources
const errorHandler = require(`${cwd}/src/middleware/500.js`);
const notFound = require(`${cwd}/src/middleware/404.js`);
const v1Router = require(`${cwd}/src/api/v1.js`);

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/doc', swagger.serve, swagger.setup(swaggerDocs));
app.use('/docs', express.static('docs'));

//Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(v1Router);

// Catchalls
app.use(notFound);
app.use(errorHandler);

let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });
};

module.exports = { app, start };
