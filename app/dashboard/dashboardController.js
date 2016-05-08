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
                if(authentication.isAdmin){
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
        '$rootScope',
        '$scope',
        '$location',
        'authentication',
        'projectServices',
        'issueServices',
        'toastr',
        function ($rootScope, $scope, $location, authentication, projectServices, issueServices, toastr) {
            //console.log('Dashboard controller loaded.');
            $scope.issueServices = issueServices;

            if(authentication.isAuthenticated() && authentication.isAdmin()){
                $scope.isAuthenticated = true;
                $scope.isAdmin = true;
                $location.path('/dashboardAdmin');
                //myIssues();
            } else if(authentication.isAuthenticated()){
                $scope.isAuthenticated = true;
                $scope.isAdmin = false;
                $location.path('/dashboard');
                //myIssues();
            }

            //function myIssues() {
                issueServices.getIssuesMe()
                    .then(function(myIssues){
                        $scope.myIssues = myIssues.data.Issues;
                        //console.log(myIssues.data);
                        //toastr.info('Load my issues is successful');
                    });
            //}

            $scope.issueDetails = function (issueDetail) {
                issueServices.getIssueById(issueDetail);
                $scope.issue = issueDetail;
                //console.log($scope.issue);
            };

            $scope.projectDetails = function (projectDetail) {
                $scope.project = projectDetail;
                //console.log($scope.project);
            };

            $scope.editIssue = function (issueId) {
                issueServices.editIssueById(issueId);
                //    .then(function (requestedIssue) {
                //        $scope.issue = requestedIssue.data;
                //        console.log(requestedIssue.data);
                //        toastr.info('New issue request status is: ' + requestedIssue.statusText);
                //        $location.path('/newIssueDetails');
                //    })
            };

            $scope.getProjectIssues = function (issueId) {
                projectServices.getProjectIssues(issueId)
                    .then(function (allProjectIssues) {
                        //console.log(allProjectIssues);
                    });
            };

            //---------------------------------------------------------------------

        }]);

