import { Router } from "express";
import { hash } from "bcryptjs";
import database from "../singletons/database.js";
import validateUser from "../middleware/validateUser.js";
import renderWithSessionMessages from "../middleware/renderWithSessionMessages.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";

const signUpRouter = Router();

signUpRouter.get("/", renderWithSessionMessages("signUp"));

signUpRouter.post("/",
  validateUser,
  handleValidationErrors("signUp"),
  async(req, res) => {
    let { username, password } = req.body;
    password = await hash(password, 10);
    await database.user.create({ data: { username, password } });
    res.redirect("/");
});

export default signUpRouter;