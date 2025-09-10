import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import indexRouter from "./routers/indexRouter";
import localStrategy from "./auth/localStrategy";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.session());
passport.use(localStrategy);

app.set("view engine", "ejs");
app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});