/**
 * Created by stoyan.stoyanov on 4/17/2016.
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackerSystem', [
    'ngRoute',
    'issueTrackerSystem.users.userController',
    'issueTrackerSystem.home.HomeController',
    'issueTrackerSystem.dashboard.DashboardController',
    'issueTrackerSystem.users.authentication',
    'issueTrackerSystem.common.footerDirective',
    'issueTrackerSystem.project.projectServices',
    'issueTrackerSystem.project.ProjectController',
    'issueTrackerSystem.issues.issueController',
    'issueTrackerSystem.issues.issueServices'
    ])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run([
        '$rootScope',
        '$location',
        'authentication',
        //тук правим проверка в sessionStorage  и ако имаме token директно се логваме
        function ($rootScope, $location, authentication) {
            if(authentication.isAuthenticated()){
                authentication.requestUserProfile();
                $location.path('/dashboard');
            }

        //Тук прихващаме грешката от DashboardControllera
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if(rejection == 'Unauthorized Access.'){
                    $location.path('/');
                    toastr.info(rejection + ' Login again!');
                }

                if(rejection == 'You is not admin.'){
                    $location.path('/dashboardAdmin');
                    toastr.info(rejection);
                }


            });


       /* $rootScope.$on('$locationChangeStart', function (event, current, previous, reject) {
            if($location.path().indexOf('/user/') != -1 && !authService.isLoggedIn()){
                //Authorization check: anonimous site visitors cannot access user roures
                $location.path('/');
            }
        });*/
    }])
    .constant('jQuery', $)
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
