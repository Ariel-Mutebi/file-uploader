import { Strategy } from "passport-local";
import { compare } from "bcryptjs";
import database from "../singletons/database.js";

const localStrategy = new Strategy(async(username, password, done) => {
  const user = await database.user.findUnique({ where: { username } });

  if(!user) {
    return done(null, false, { message: "There is no account with that username." });
  };

  if(!await compare(password, user.password)) {
    return done(null, false, { message: "Wrong password. Try again." })
  };

  return done(null, user);
});

export default localStrategy;