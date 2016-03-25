'use strict'


// Loads a single partial html page
exports.loadPartial = function(req, res){
    console.log('here');
    // run with `NODE_ENV=test` to display path name
    if( (process.env['NODE_ENV'] || '' ).toLowerCase() !== 'production' ) console.log("PATH: ", req.params.path );   
    return res.render('partials/' + req.params.path + '.ejs', { user: req.user } );
    
};


exports.index = function(req, res){
    console.log("INDEX: ", res.params);
    res.render('base.ejs');
};

