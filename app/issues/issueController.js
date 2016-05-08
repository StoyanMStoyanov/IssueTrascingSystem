/**
 * Created by stoyan.stoyanov on 4/27/2016.
 */
'use strict';
angular.module('issueTrackerSystem.issues.issueController', [
    'issueTrackerSystem.issues.issueServices'
])
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

        $routeProvider.when('/addNewIssue', {
            templateUrl: 'app/issues/addNewIssue.html',
            controller: 'IssueController',
            resolve: routeChecks.adminRole
        });

        $routeProvider.when('/viewIssue/:Id', {
            templateUrl: 'app/issues/issueDetails.html',
            controller: 'IssueController',
            resolve: routeChecks.adminRole
        });

        $routeProvider.when('/editIssue/:Id', {
            templateUrl: 'app/issues/editIssue.html',
            controller: 'IssueController',
            resolve: routeChecks.adminRole
        });

    }])
    .controller('IssueController', [
        '$rootScope',
        '$scope',
        '$location',
        'authentication',
        'issueServices',
        'toastr',
        function ($rootScope, $scope, $location, authentication, issueServices, toastr) {
            //console.log('Issue controller loaded.');

            issueServices.getIssuesMe()
                .then(function (issues) {
                    $scope.myIssues = issues.data.Issues[0];
                });


            $scope.getIssuesByProject = function (projectId) {
                //TODO: Call function from issueServices
            };
//-------------------------------------------------------------
            //не се ползва
            $scope.showIssueById = function (issue) {
                //$rootScope.issue = issue;
                //$scope.issue = issue;
                console.log(issue);
                //issueServices.getIssueById(issueId);
                    //.then();
            };
//-------------------------------------------------------------

            $scope.addIssue = function (newIssue) {
                issueServices.addNewIssue(newIssue)
                    .then(function (requestedIssue) {
                        $scope.issue = requestedIssue.data;
                        //console.log(requestedIssue.data);
                        toastr.info('New issue request status is: ' + requestedIssue.statusText);
                        $location.path('/dashboardAdmin');
                    });
            };


            $scope.issueDetails = function (issueDetail) {
                issueServices.getIssueById(issueDetail);
                $scope.issue = issueDetail;
                //console.log($scope.issue);
            };

        }
    ]);