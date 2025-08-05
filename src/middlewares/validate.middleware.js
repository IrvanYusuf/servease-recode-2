const validateMiddleware = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw error;
  }

  req.validated = value;
  next();
};

module.exports = validateMiddleware;
