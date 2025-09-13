import { body } from "express-validator";
import database from "../singletons/database.js";

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Your username should be between 1 and 20 characters.")
    .isAlphanumeric()
    .withMessage("Your username can only be characters and numbers (no spaces).")
    .custom(async(value) => {
      if(await database.user.findUnique({ where: { username: value } })) {
        throw new Error("That username is in use.");
      };
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Your password must be 8 characters at least.")
];

export default validateUser;