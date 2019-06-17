'use strict';
/**
 * send 404 response as JSON
 * @param req{object}
 * @param res{object}
 * @param next{function}
 */
module.exports = (req, res, next) => {
  let error = { error: 'Resource Not Found' };
  res
    .status(404)
    .json(error)
    .end();
};
