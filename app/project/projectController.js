/**
 * Created by stoyan.stoyanov on 5/2/2016.
 */
angular.module('issueTrackerSystem.project.ProjectController', [
        'issueTrackerSystem.project.projectServices'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addNewProject', {
            templateUrl: 'app/project/addNewProject.html',
            controller: 'ProjectController'
        });

        $routeProvider.when('/editProject', {
            templateUrl: 'app/project/editProject.html',
            controller: 'ProjectController'
        });
    }])
    .controller('ProjectController', [
        '$scope',
        'authentication',
        'projectServices',
        'toastr',
        function ($scope, authentication, projectServices) {
            $scope.projectServices = projectServices;

            if(authentication.isAuthenticated()){
                $scope.isAuthenicated = true;
                $scope.AllProjects = projectServices.getAllProjects();
                //    .then(function (responce) {
                //        $scope.allProjects = responce.data;
                //        console.log($scope.allProjects);
                 //   });
                //projectServices.getAllProjects();
                //console.log($scope.allProjects);
            }

            $scope.addNewProject = projectServices.addProject(projectData)
                .then(function () {
                    toastr.info('Add new project successfully.');
                });

            //---------------------------------------------------------------------



    }]);
