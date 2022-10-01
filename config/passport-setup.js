const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20'); 
const GoogleCredentials = require('./keys'); // for auth 

const { saveUserDataProfile } = require('../firebase/firebaseConfig'); 

passport.use(
    new GoogleStrategy({
    // options for strategy 
    callbackURL: '/auth/google/redirect',
    clientID: GoogleCredentials.google.clientID,
    clientSecret: GoogleCredentials.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {  
    // passport callback function 
    console.log('passport callback function fired:'); 
    console.log(profile);

    //save data to db 
    saveUserDataProfile(profile);
    done();
})); 