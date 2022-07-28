const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = '532464152340-sq4pqa3gkra4ns9l0bl12gn3orgqppob.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_URL = 'http://localhost:3000/auth/google/callback';
//const GOOGLE_URL = 'https://anhdw-mp3-api.herokuapp.com/auth/google/callback';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_URL,
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})