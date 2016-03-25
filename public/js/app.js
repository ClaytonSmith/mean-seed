'use strict';

// Declare app level module which depends on filters, and services                                          
var app = angular.module('practissimoApp', 
			 [ // Load angular modules
			     
			     //'practissimoApp.filters',
			     //'practissimoApp.services',
			     //'practissimoApp.controllers',
			     //'practissimoApp.directives'
			    
			     'ngRoute',
			     'ngResource'
			     
			 ]);

// Configure angular client side routing
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/',        {templateUrl: '/partials/index',    controller:  indexCtrl });
    $routeProvider.when('/sign-in', {templateUrl: '/partials/sign-in',  controller:  signInCtrl });
    $routeProvider.when('/sign-up', {templateUrl: '/partials/sign-up',  controller:  signUpCtrl });
    $routeProvider.when('/profile', {templateUrl: '/partials/profile',  controller:  profileCtrl });
    
    console.log('HELLO');
    
    //Default path
    //$routeProvider.otherwise({redirectTo: '/'});
    
    // Remove the `#` from the URL
    $locationProvider.html5Mode(true);
}]);
