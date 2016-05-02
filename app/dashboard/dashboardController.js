/**
 * Created by stoyan.stoyanov on 4/29/2016.
 */

'use strict';
angular.module('issueTrackerSystem.dashboard.DashboardController', [])
    .config(['$routeProvider', function ($routeProvider) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if(authentication.isAuthenticated()){
                    return $q.when(true);
                }
                return $q.reject('Unauthorized Access.')
            }],
            adminRole: [function ($q, authentication) {
                console.log(authentication.getUserProfile());
                var admin = authentication.getUserProfile().isAdmin;
                if(admin){
                    return $q.when(true);
                }
                return $q.reject('You not admin.');
            }]
        };
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            resolve: routeChecks.authenticated
        });

        $routeProvider.when('/dashboardAdmin', {
            templateUrl: 'app/dashboard/dashboard-admin.html',
            controller: 'DashboardController',
            resolve: routeChecks.adminRole
        });
    }])
    .controller('DashboardController',[
        '$scope',
        'authentication',
        function ($scope, authentication) {
            var user = {};
            if(authentication.isAuthenticated()){
                user = authentication.getCurrentUser();
                $scope.currentUser = user;
                $scope.isAuthenicated = true;
            }
            //---------------------------------------------------------------------

        }]);
/* if(authentication.isAuthenticated){
 authentication.getCurrentUser()
 .then(function (user) {
 $scope.currentUser = user;
 $scope.isAuthenicated = true;
 })
 } */
