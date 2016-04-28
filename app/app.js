/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
    'ngRoute',
    'ngCookies',
    'issueTrackerSystem.users.userController',
    'issueTrackerSystem.users.identity'
])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    }])
/*    .run(function ($rootScope, $location, authService) {
        $rootScope.$on('$locationChangeStart', function (event) {
            if($location.path().indexOf('/user/') != -1 && !authService.isLoggedIn()){
                //Authorization check: anonimous site visitors cannot access user roures
                $location.path('/');
            }
        });
    })*/
    .constant('jQuery', $)
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
