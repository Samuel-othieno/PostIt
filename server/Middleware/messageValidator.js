import { validationResult, body } from "express-validator";

async function validationResult(req) {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

const bodyValidator = [
  body("senderId").isInt(),
  body("receiverId").isInt(),
  body("content").isString().notEmpty(),
];

export { validationResult, bodyValidator };
