/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */

'use strict';
angular.module('issueTrascingSystem.home.HomeController', [

    ])
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
        function ($scope) {

            $scope.loginUser = function (){
                console.log('loginUser');
            };

            $scope.registerUser = function () {
                console.log('registerUser');
            };

            if(authentication.isAuthenicated()){
                identity.getCurrentUser()
                    .then(function (user) {
                        $scope.currentUser = user;
                        //Това е за менто горе
                        $scope.isAuthenicated = true;
                    });
            }
        }

    ]);