import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().min(3).max(40).alphanum().required(),
  password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
  firstname: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9 ,.!;:'\"-]+$"))
    .required()
    .messages({
      "string.empty": "Please enter your first name",
      "any.required": "Please enter your first name",
    }),

  lastname: Joi.string().min(3).max(20).alphanum().required().messages({
    "string.empty": "Please enter your last name",
    "any.required": "Please enter your last name",
  }),

  nationality: Joi.string()
    .min(3)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9 ,.!;:'\"-]+$"))
    .required()
    .messages({
      "string.empty": "Please enter your nationality",
      "any.required": "Please enter your nationality",
    }),

  address: Joi.string()
    .min(3)
    .max(50)
    .pattern(new RegExp("^[a-zA-Z0-9 ,.!;:'\"-]+$"))
    .required()
    .messages({
      "string.empty": "Please enter your address",
      "any.required": "Please enter your address",
    }),

  gender: Joi.string()
    .valid("Male", "Female", "PREFER_NOT_TO_SAY")
    .required()
    .messages({
      "string.empty": "Please select your gender",
      "any.only": "Please select a valid gender",
      "any.required": "Please select your gender",
    }),
});

function validate(schema) {
  return (req, res, next) => {
    if (typeof req.body !== "object" || req.body === null) {
      return res.json({
        error: "Request body is not an object or is undefined",
      });
    }

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => {
        return { field: err.path[0], message: err.message };
      });

      return res.status(400).json(errors);
    } else {
      next();
    }
  };
}

export { validate, schema };
