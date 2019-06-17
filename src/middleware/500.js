'use strict';

/**
 * send 500 response as JSON
 * @param req{object}
 * @param res{object}
 * @param next{function}
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res
    .status(500)
    .json(error)
    .end();
};
