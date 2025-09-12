import { Router } from "express";
import { hash } from "bcryptjs";
import database from "../singletons/database.js";
import validateUser from "../middleware/validateUser.js";

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
  const { messages } = req.session;
  res.render("signUp", { messages });
  res.session.messages = [];
});

signUpRouter.post("/",
  validateUser,
  async(req, res) => {
    let { username, password } = req.body;
    password = await hash(password, 10);
    await database.user.create({ data: { username, password } });
    res.redirect("/");
});

export default signUpRouter;