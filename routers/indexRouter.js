import { Router } from "express";

const indexRouter = Router();

// I know that I'm not supposed to put the controllers here.
// But I want the autocomplete and I'm not using Typescript.
// So, I'm doing it anyway.

indexRouter.get("/", (req, res) => {
  res.render("index");
})

export default indexRouter;