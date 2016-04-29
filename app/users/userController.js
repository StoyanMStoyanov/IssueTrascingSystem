/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
angular.module('issueTrackerSystem.users.userController', [
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
            //----------------------------------------
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        //console.log(loggedUser);
                        $location.path('/register');
                        //$location.path('/dashboard');
                    });
            };
            //-----------------------------------------
            $scope.register = function (user) {
                debugger;
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        $scope.registeredUser = registeredUser;
                        console.log(registeredUser);
                        $location.path('/login');
                    }, function (error) {
                        console.log('This is error from THEN section after register user.')
                    })
            };
            //-----------------------------------------
            $scope.logout = function () {
                authentication.logout();
            };

        }]);
/* var loginUser = {
 username: registeredUser.config.email,
 password: registeredUser.config.password
 }.then(function (usr) {
 console.log(usr);
 authentication.loginUser(loginUser);
 console.log('Register after THEN THEN section.')
 }*/