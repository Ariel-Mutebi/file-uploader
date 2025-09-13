import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import indexRouter from "./routers/indexRouter.js";
import localStrategy from "./auth/localStrategy.js";
import database from "./singletons/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.session());
passport.use(localStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async(user, done) => {
  try {
    done(null, await database.user.findUnique({where: { id: user }}));
  } catch (error) {
    console.error(error);
  }
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

// set up views
app.set("view engine", "ejs");
app.use(indexRouter);

// start app
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});