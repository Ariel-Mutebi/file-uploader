import { Router } from "express";
import signUpRouter from "./signUpRouter.js";

const indexRouter = Router();

// I know that I'm not supposed to put the controllers here.
// But I want the autocomplete and I'm not using Typescript.
// So, I'm doing it anyway.

indexRouter.get("/", (req, res) => {
  res.render("index");
})

indexRouter.use("/sign-up", signUpRouter);

export default indexRouter;