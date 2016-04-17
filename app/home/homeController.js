/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
angular.module('issueTrascingSystem.home', [

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
            }
        }
    ]);