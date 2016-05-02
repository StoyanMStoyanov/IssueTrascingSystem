/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */

'use strict';
angular.module('issueTrackerSystem.home.HomeController', [

    'issueTrackerSystem.users.authentication'
    ])
    .controller('HomeController', [
        '$rootScope',
        '$scope',
        '$location',
        'authentication',
        function ($rootScope, $scope, $location, authentication) {
            var authenticated = authentication.isAuthenticated();
            if(authenticated){
                authentication.getCurrentUser()
                    .then(function (user) {
                        console.log(user);
                        $scope.currentUser = user;
                        $rootScope.isAuthenticated = true;
                        $location.path('/dashboardAdmin')
                    });
            }


        }
    ]);


/*
*

 var user = {};
 if(authentication.isAuthenticated()){
 user = authentication.getCurrentUser();
 $scope.currentUser = user;
 $scope.isAuthenicated = true;
 //debugger;
 console.log(authentication.isAdmin());
 if(authentication.isAdmin){
 $scope.isAdmin = 'Admin';
 } else {
 $scope.isAdmin = 'None';
 }
 $scope.username = user.userName;
 //console.log(user.userName);
 }
* */