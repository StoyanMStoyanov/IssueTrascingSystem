/**
 * Created by stoyan.stoyanov on 4/28/2016.
 */

'use strict';

angular.module('issueTrackerSystem.project.projectServices', [])
    .factory('projectServices', [
        '$rootScope',
        '$http',
        '$q',
        'BASE_URL',
        'authentication',
    function ($rootScope, $http, $q, BASE_URL, authentication) {
        function getLatestProjects(pageSize){
            pageSize = pageSize || 5;
            //TODO: Write logic for add new project


        }

        function getAllProjects(){
            var deffered = $q.defer();
            var request = {
                method: 'GET',
                url: BASE_URL + 'Projects/',
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
                }};
            $http(request)
                .then(function (responce) {
                    $rootScope.allProjects = responce.data;
                //console.log(responce);
                //return responce;
            });
            return deffered.promise;
        }

        function getProjectById(projectId){
            //TODO: Write logic for add new project
        }

        function  addProject(){
            //TODO: Write logic for edit existing project
            console.log('addProject function.');
        }

        function editProjectById(projectId){
            //TODO: Write logic for add new project
        }

        return {
            getAllProjects:     getAllProjects,
            getProjectById:     getProjectById,
            addProject:         addProject,
            editProjectById:    editProjectById
        }
    }
]);