const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const secret = process.env.JWT_SECRET;

const options = {
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
 try {
   return done(null, true);
 } catch (error) {
   return done(error, false);
 }
});


module.exports = (passport) => {
    passport.use(strategy);
}