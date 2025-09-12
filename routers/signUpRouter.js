import { Router } from "express";
import { hash } from "bcryptjs";
import database from "../singletons/database.js";

const signUpRouter = Router();

signUpRouter.get("/", (_req, res) => {
  res.render("signUp");
});

signUpRouter.post("/", async(req, res) => {
  let { username, password } = req.body;
  password = await hash(password, 10);
  await database.user.create({ data: { username, password } });
  res.redirect("/");
});

export default signUpRouter;