import { validationResult } from "express-validator";

const handleValidationErrors = (view) =>  (req, res, next) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) return next();
  res.render(view, { errors: errors.array() });
};

export default handleValidationErrors;