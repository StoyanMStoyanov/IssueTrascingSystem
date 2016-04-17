/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
    'ngRoute',
    'issueTrackerSystem.users'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        teplateUrl: 'app/dasboard/dashboard.html',
        controller: 'UserController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}])
    .constant('BASE_URL', '): ⦁	http://softuni-issue-tracker.azurewebsites.net/');
