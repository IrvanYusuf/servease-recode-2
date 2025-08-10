"use strict";

var validateMiddleware = function validateMiddleware(schema) {
  return function (req, res, next) {
    var _schema$validate = schema.validate(req.body, {
        abortEarly: false
      }),
      error = _schema$validate.error,
      value = _schema$validate.value;
    if (error) {
      throw error;
    }
    req.validated = value;
    next();
  };
};
module.exports = validateMiddleware;