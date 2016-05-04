/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
angular.module('issueTrackerSystem.users.userController', [
        'issueTrackerSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider){
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if(authentication.isAuthenticated()){
                    return $q.when(true);
                }
                return $q.reject('Unauthorized Access.')
            }],
            adminRole: [function () {

            }]
        };

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

        $routeProvider.when('/logout', {
            templateUrl:'app/home/welcome.html',
            controller: 'UserController'
        });

        $routeProvider.when('/changePassword', {
            templateUrl:'app/users/changePassword.html',
            controller: 'UserController',
            resolve: routeChecks.authenticated
        });
        $routeProvider.when('/getAllUsers', {
            templateUrl:'app/users/allUsers.html',
            controller: 'UserController'

        });



    }])
    .controller('UserController', [
        '$rootScope',
        '$scope',
        '$location',
        'authentication',
        function ($rootScope, $scope, $location, authentication) {

            var currentUser = {};

            //----------------------------------------
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        $rootScope.currentUser = loggedUser;
                        //console.log($rootScope.currentUser);
                        $location.path('/dashboardAdmin');
                    });
            };
            //-----------------------------------------
            $scope.register = function (user) {
                authentication.registerUser(user);
            };
            //-----------------------------------------
            $scope.logout = function () {
                authentication.logout();
                $location.path('/');
            };

            $scope.getUsers = function () {
                authentication.getAllUsers()
                    .then(function (userData) {
                        console.log(userData);
                        $scope.Users = userData.data;
                        $location.path('/getAllUsers');
                    });
            };
            //-----------------------------------------
            $scope.changePassword = function (userData) {
                //console.log(userData);
                authentication.changePassword(userData);
                $location.path('/changePassword');

            };
            //-----------------------------------------
            $scope.makeCurrentUserAdmin = function () {
                authentication.makeAdmin();
            };

            $scope.getAllUsers = function () {
                authentication.getAllUsers()
                    .then(function (allUsers) {
                        //console.log(allUsers);
                        $scope.allUsers = allUsers;
                    })
            }

        }]);
