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
                return $q.reject('Unauthorized Access. LOGIN!')
            }],
            adminRole: [function () {

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
        'identity',
        function ($scope, authentication, identity) {
            if(authentication.isAuthenticated){
                identity.getCurrentUser()
                    .then(function (user) {
                        $scope.currentUser = user;
                        $scope.isAuthenicated = true;
                    })
            }
            //---------------------------------------------------------------------

        }]);

