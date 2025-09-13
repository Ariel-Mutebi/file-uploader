import { Router } from "express";
import passport from "passport";
import renderWithSessionMessages from "../middleware/renderWithSessionMessages.js";

const loginRouter = Router();

loginRouter.get("/", renderWithSessionMessages("login"));

loginRouter.post("/", passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureMessage: true
}));

export default loginRouter;