import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserModel } from './models/user.model';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy(
 async function(username, password, done) {
    // Replace this with your code to retrieve a user from your database
    console.log('HERERE ')
    const user =  await UserModel.findOne({username});;
    console.log('user is ', user);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    });
  }
));

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'supersecuresecret', // This should be stored in an environment variable
};

passport.use(
  new Strategy(options, async (payload, done) => {
    console.log('payload is ', payload);
    try {
      const user = await UserModel.findById(payload.id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
