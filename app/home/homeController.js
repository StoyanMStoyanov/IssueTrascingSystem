/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */

'use strict';
angular.module('issueTrackerSystem.home.HomeController', [])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/home/welcome.html',
                controller: 'HomeController'
            });
        }
    ])
    .controller('HomeController', [
        '$scope',
        'authentication',
        'identity',
        function ($scope, authentication, identity) {
            if(authentication.isAuthenticated()){
                identity.getCurrentUser()
                    .then(function (user) {
                        $scope.currentUser = user;
                        $scope.isAuthenticated = true;
                        console.log('Authenticated ' + user);
                    });
            }

        }
    ]);