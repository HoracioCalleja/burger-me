import validator from "validator";
const checkValidation = (value, rules) => {
  let isValid = true;

  if (rules.notEmpty) {
    isValid = !validator.isEmpty(value.trim()) && isValid;
  }

  if (rules.lengths) {
    isValid =
      validator.isLength(value, {
        min: rules.lengths.min,
        max: rules.lengths.max,
      }) && isValid;
  }

  if (rules.isAlpha) {
    isValid = validator.isAlpha(value) && isValid;
  }

  if (rules.isPostalCode) {
    isValid = validator.isPostalCode(value, "any") && isValid;
  }

  if (rules.isEmail) {
    isValid = validator.isEmail(value) && isValid;
  }

  if(rules.notNumber) {
    isValid = !validator.isNumeric(value) && isValid;
  }

  return isValid;
};

export default checkValidation;
