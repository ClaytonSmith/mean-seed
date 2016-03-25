// load passport local strategy
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require('mongoose');
// load up the user model
var Users       = mongoose.model('User');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user and update user session
    //passport.deserializeUser( User.findById );
    passport.deserializeUser(function(id, done) {
        Users.findById(id, done );
    });
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
	
        // asynchronous
        process.nextTick(function() {
	    
	    // Use lower-case e-mails to avoid case-sensitive e-mail matching
            User.findOne({ email: email.toLowerCase() }, function(err, user) {
		
                // if there are any errors, return the error
                if (err) return done(err);

                // if no user is found, return the message
                if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
		return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
		
		// Use lower-case e-mails to avoid case-sensitive e-mail matching
		User.findOne({ email: email.toLowerCase() }, function(err, user) {
                
		    // if there are any errors, return the error
                    if (err) return done(err);
		    
                    // check to see if theres already a user with that email
                    if (user) return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
	
		    console.log('TEST', req.body.name, email, password );
                    // create the user
                    var newUser = User.register( req.body.name, email, password ) ;

		    console.log("newUser", newUser);

                    newUser.save(function(err) {
			console.log("save", err, newUser);
                        return done( err, newUser );
                    });
                });
		
	    } else {
                
		// user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));
};
