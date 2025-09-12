import { Router } from "express";
import passport from "passport";
import validateUser from "../middleware/validateUser.js";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const { messages } = req.session;
  res.render("login", { messages });
  req.session.messages = [];
});

loginRouter.post("/",
  validateUser,
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureMessage: true
  })
);

export default loginRouter;