'use strict';

/* Controllers */

console.log('I am in this file')
// Helper function 
// Tests to see if an object is empty.
function isEmptyObject(obj){
    for(var propName in obj){
        if(obj.hasOwnProperty(propName)){
            return false;
        }
    }
    return true;
}

// Helper function
// Returns a true if a list contains an element.
function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}


function indexCtrl($scope, $http, $location, $rootScope){
    console.log('Inside the controller')
}


function signInCtrl($scope, $http, $location, $rootScope){

}


function signUpCtrl($scope, $http, $location, $rootScope){

}

function profileCtrl($scope, $http, $location, $rootScope){

}

// inject methods
indexCtrl.       $inject  =  ['$scope', '$http', '$location', '$rootScope'];
signInCtrl.      $inject  =  ['$scope', '$http', '$location', '$rootScope'];
signUpCtrl.      $inject  =  ['$scope', '$http', '$location', '$rootScope'];
profileCtrl.     $inject  =  ['$scope', '$http', '$location', '$rootScope'];

