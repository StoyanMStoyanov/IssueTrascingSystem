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
            //console.log('Home controller loaded.');

            if(authentication.isAuthenticated()){
                authentication.getCurrentUser()
                    .then(function (user) {
                        console.log(user);
                        $scope.currentUser = user;
                        $rootScope.isAuthenticated = true;
                        $location.path('/dashboard');
                        location.reload();
                    });
            }

        }
    ]);