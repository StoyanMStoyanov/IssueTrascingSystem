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
            controller: 'UserController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/editUserProfile', {
            templateUrl:'app/users/editUserProfile.html',
            controller: 'UserController',
            resolve: routeChecks.authenticated
        });



    }])
    .controller('UserController', [
        '$rootScope',
        '$scope',
        '$location',
        'authentication',
        function ($rootScope, $scope, $location, authentication) {
            //console.log('User controller loaded.');

            if(authentication.isAuthenticated()) {
                $scope.username = authentication.getUserProfile().Username;
                $scope.isAuthenticated = authentication.isAuthenticated();
                $scope.isAdmin = authentication.isAdmin();
            }

            //----------------------------------------
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        $rootScope.currentUser = loggedUser;
                        //console.log(isAdmin);
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
                        //console.log(userData);
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

            $scope.makeUserAdmin = function () {
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
