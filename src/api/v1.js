'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);
// const swagger = require('swagger-ui-express');
// const swaggerDocs = require('../../docs/config/swagger.json');
const router = express.Router();
// Evaluate the model, dynamically
router.param('model', modelFinder);

// router.use('/api/v1/doc', swagger.serve, swagger.setup(swaggerDocs));
// router.use('/docs', express.static('docs'));

// API Routes
router.get('/', (req, res, next) => {
  res.status(200).send('this is the home page!');
});
router.get('/api/v1/:model/:id', handleGetOne);
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);
router.put('/api/v1/:model/:id', handlePut);
router.patch('./api/v1:model/:id', handlePatch);
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
//Get One ==================================================
/**
 *get specifict data from model
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @return {object}
 */
function handleGetOne(request, response, next) {
  console.log('getting things');
  request.model
    .get(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

//Get all ===================================================
/**
 * get all data from model
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @return {object}
 */
function handleGetAll(request, response, next) {
  console.log('getting things');
  request.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data
      };
      response.status(200).json(output);
    })
    .catch(next);
}
//Post ===================================================
/**
 * Add data through model
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @return {object}
 */
function handlePost(request, response, next) {
  request.model
    .post(request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
//Put ===================================================
/**
 * Update specific data through model
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @return {object}
 */
function handlePut(request, response, next) {
  request.model
    .put(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
//Patch ===================================================
/**
 *
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @return {object}
 */
function handlePatch(request, response, next) {
  request.model
    .patch(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}
//Delete ===================================================
/**
 * Delete specific data through model
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @return {object}
 */
function handleDelete(request, response, next) {
  request.model
    .delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}

module.exports = router;
