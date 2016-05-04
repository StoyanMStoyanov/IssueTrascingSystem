/**
 * Created by stoyan.stoyanov on 5/2/2016.
 */
angular.module('issueTrackerSystem.project.ProjectController', [
        'issueTrackerSystem.users.authentication',
        'issueTrackerSystem.project.projectServices'
    ])
    .config(['$routeProvider',  function ($routeProvider ) {
        var routeChecks = {
            authenticated: ['$q', 'authentication', function ($q, authentication) {
                if(authentication.isAuthenticated()){
                    return $q.when(true);
                }
                return $q.reject('Unauthorized Access.')
            }],
            adminRole: ['$q', 'authentication', function ($q, authentication) {
                if(authentication.isAdmin()){
                    return $q.when(true);
                }
                return $q.reject('You is not admin.')
            }]
        };

        $routeProvider.when('/addNewProject', {
            templateUrl: 'app/project/addNewProject.html',
            controller: 'ProjectController',
            resolve: routeChecks.adminRole
        });

        $routeProvider.when('/editProject', {
            templateUrl: 'app/project/editProject.html',
            controller: 'ProjectController',
            resolve: routeChecks.adminRole
        });
    }])
    .controller('ProjectController', [
        '$rootScope',
        '$scope',
        '$location',
        'authentication',
        'projectServices',
        'toastr',
        function ($rootScope, $scope, $location, authentication, projectServices, toastr) {
            //$scope.projectServices = projectServices;
            if(authentication.isAuthenticated()){
                $scope.isAuthenicated = true;
                $scope.allProjects = projectServices.getAllProjects();
            }
            //---------------------------------------------------------------------
            $scope.addNewProject = function (project) {
                projectServices.addProject(project)
                .then(function (registeredProject) {
                    //console.log(registeredProject);
                    toastr.info('Project ' + registeredProject.name + 'was successfully added.');
                    //$location.path('');
                })
            };
            //---------------------------------------------------------------------
            $scope.editExistingProject = function (projectId) {
                projectServices.editProjectById(projectId);
                //    .then(function (editedProject) {
                //        console.log(editedProject);
                        //TODO: Show newly registered project
                        //toastr.info('Project ' + registeredProject.name + 'was successfully edited.');
                //        $location.path('');
                //    })
            };
            //---------------------------------------------------------------------


    }]);
