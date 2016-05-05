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
        function ($rootScope, $http, $q, BASE_URL) {

        function getAllProjects(projectId){
            projectId = projectId || '';
            var differed = $q.defer();

            var request = {
                method: 'GET',
                url: BASE_URL + 'Projects/' + projectId,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
                }};
            $http(request)
                .then(function (responce) {
                    $rootScope.allProjects = responce.data;
                    differed.resolve(responce.data);
                    //console.log(responce);
                });
            return differed.promise;
        }

        function getProjectById(projectId){
            projectId = projectId || 1;
            var deffer = $q.defer();
            var request = {
                method: 'GET',
                url: BASE_URL + 'Projects/' + projectId,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token
                }
            };
            $http(request)
                .then(function (responce) {
                    $rootScope.allProjects = responce.data;
                    deffer.resolve(responce);
                    console.log(responce.data);
                    }
                );
            return deffer.promise;
        }

        function  addProject(projectData){

            var deffered = $q.defer();

            var parsedProjectData = {};

            parsedProjectData.Description = projectData.Description;
            parsedProjectData.LeadId = projectData.LeadId;
            parsedProjectData.Name = projectData.Name;
            parsedProjectData.ProjectKey = parseProjectKey(projectData.Name);
            parseArray('priorities', '.Name', projectData.Priorities.replace(' ', '').split(','), parsedProjectData);
            parseArray('labels', '.Name', projectData.Labels.replace(/\s+/g, '').split(','), parsedProjectData);
            //console.log('Data before convert: '+parsedProjectData);
            var projData = convertToString(parsedProjectData);
            //console.log(projData);

            var request = {
                method: 'POST',
                url: BASE_URL + 'Projects/',
                data: projData,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            //console.log(request);
            $http(request).then(function (request) {
                deffered.resolve(request);
            });
            return deffered.promise;
        }

        function editProjectById(projectId){
            //TODO: Write logic for add new project
        }

        function parseProjectKey(inputString){
            var outputString = '';
            inputString.split(' ')
                .forEach(function (str) {
                    outputString+=(str[0]);
                });
            return outputString;
        }

        function parseArray(key1, key2, array, projectCollection){
            var index, len;
            var key = '', value = '';
            for(index = 0, len = array.length; index < len; index++){
                key = key1+'['+index+']'+ key2;
                value = array[index];
                projectCollection[key]=value;
            }
        }

        function convertToString(input){
            var outputString = '';
            for(var item in input){
                outputString += encodeURI(item)+'='+encodeURI(input[item])+ '&';
            }
            outputString = outputString.replace(/%20+/g, '+');
            var index = outputString.length-1;
            outputString = outputString.substring(0, index);

            return outputString;
        }

        return {
            getAllProjects:     getAllProjects,
            getProjectById:     getProjectById,
            addProject:         addProject,
            editProjectById:    editProjectById
        }
    }
]);