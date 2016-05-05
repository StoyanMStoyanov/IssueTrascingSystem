/**
 * Created by stoyan.stoyanov on 4/27/2016.
 */
'use strict';
angular.module('issueTrackerSystem.issues.issueController', [
    'issueTrackerSystem.issues.issueServices'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editIssue', {
            templateUrl: 'app/issues/editIssue.html',
            controller: 'IssueController'
        });
        $routeProvider.when('/addNewIssue', {
            templateUrl: 'app/issues/addNewIssue.html',
            controller: 'IssueController'
        });
        $routeProvider.when('/newIssueDetails', {
            templateUrl: 'app/issues/newIssueDetails.html',
            controller: 'IssueController'
        });
    }])
    .controller('IssueController', [
        '$scope',
        '$location',
        'issueServices',
        function ($scope, $location, issueServices) {
            //$scope.issueServices = issueServices;

            $scope.getIssuesByProject = function (projectId) {
                //TODO: Call function from issueServices
            };

            $scope.getIssuesMe = function (projectId) {
                //TODO: Call function from issueServices
            };

            $scope.getIssueById = function (projectId) {
                //TODO: Call function from issueServices
            };

            $scope.addIssue = function (issue) {
                issueServices.addNewIssue(issue)
                    .then(function (requestedIssue) {
                        $scope.newlyCreatedIssue = requestedIssue;
                        console.log(requestedIssue);
                        //$location('/newIssueDetails')
                    });
            };

            $scope.editIssue = function (issue) {
                //TODO: Call function from issueServices
            };

            $scope.getAllIssues = function () {
                //TODO: Call function from issueServices
            };
        }
    ]);