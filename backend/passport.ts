import passportJWT from "passport-jwt";
import "dotenv/config";
import User from "./models/user";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const jwtStrategy = new JwtStrategy(opts, async (payload: any, done: any) => {
  const user = await User.findById({ _id: payload.userID });
  if (user) {
    return done(null, user);
  }
  return done(null, false, {
    message: "Could not find an account associated with this email.",
  });
});

export { jwtStrategy };