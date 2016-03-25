// load the things we need
var mongoose      = require('mongoose');
var bcrypt        = require('bcrypt-nodejs');
var mongoose      = require('mongoose');

// define the schema for our user model
var userSchema = new mongoose.Schema({

    dateAdded:      { type: Date,  default: Date.now },            // Join date
    lastUpdated:    { type: Date,  default: Date.now },            // Last seen
  
    email:         { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    name:          { type: String, required: true }

});

// Object methods 
userSchema.method({ 
    
    // checking if password is valid
    validPassword: function(password) {
	return bcrypt.compareSync(password, this.password);
    }

});

// Module methods
userSchema.static({
    
    // Generate password hash
    generateHash: function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    
    register: function(name, email, password){
	var newUser = new this({
	    name: name,
	    email: email.toLowerCase(),
	    password: this.generateHash( password )
	});
	
	return newUser;
    }
    
    
});



userSchema.pre('save', function(next) {
    var user = this;
    user.lastUpdated = Date.now();    
    
    next();
});


userSchema.pre('remove', function(next) {
    var user = this;
    
    // cleanup
    next();
});
    
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
