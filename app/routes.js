'use strict'

var partials   = require('./controllers/partials');
var apiRoutes  = require('./controllers/apiRoutes');

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', partials.index );

    // Just to be safe
    app.get('/partials/sign-in', function(req, res) {
        res.render('partials/sign-in.ejs', { message: req.flash('loginMessage') });
    });

    
    // Just to be safe
    app.get('/partials/sign-up', function(req, res) {
        res.render('partials/sign-up.ejs', { message: req.flash('signupMessage') });
    });
    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Just to be safe
    app.get('/partials/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/partials/:path', partials.loadPartial );
         
    // =============================================================================
    // AUTHENTICATE ================================================================
    // =============================================================================
        
    // process the login form
    app.post('/sign-in', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    

    // process the signup form
    app.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    
    // Load api routes
    app.use('/api', apiRoutes );
    
    
    app.get('*', partials.index );
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
