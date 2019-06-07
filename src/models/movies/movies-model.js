'use strict';

const Model = require('../mongo-model.js');
const schema = require('./movies-schema.js');
/**
 * extend model to Movies class
 */
class Movies extends Model {}

module.exports = new Movies(schema);
