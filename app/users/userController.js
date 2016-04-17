/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
angular.module('issueTrackerSystem.users', [
        'issueTrackerSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'app/home/welcome.html',
            controller: 'UserController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'app/users/login.html',
            controller: 'UserController'
        });

        $routeProvider.when('/register', {
            templateUrl: 'app/users/register.html',
            controller: 'UserController'
        });
    }])
    .controller('UserController', [
        '$scope',
        '$location',
        'authentication',
        function ($scope, $location, authentication) {
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        console.log(loggedUser);
                        $location.path('/dashboard');
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser);
                        $location.path('/dashboard');
                    });
            };
        }]);
