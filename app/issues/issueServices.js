/**
 * Created by stoyan.stoyanov on 4/27/2016.
 */
'use strict';

angular.module('issueTrackerSystem.issues.issueServices', [])
    .factory('issueServices', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, BASE_URL) {

        function addNewIssue(inputIssueData){
            //TODO: Write logic for add new issue
            var deferred = $q.defer();

            var parsedIssueData = inputIssueData;
            var dataForParse = parsedIssueData.Labels.replace(/\s+/g, '');
            delete parsedIssueData['Labels'];
            parseArray('labels', '.Name', dataForParse.split(','), parsedIssueData);
            //dataForParse = parsedIssueData.DueDate;
            //parsedIssueData.DueDate = '';
            //parsedIssueData.DueDate = parseDate(dataForParse);
            var issueData = convertToString(parsedIssueData);
            //console.log(parsedIssueData);
            var request = {
                method: 'POST',
                url: BASE_URL + 'issues/',
                data: issueData,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            console.log(request);
            $http(request)
                .then(function (requestedIssue) {
                    //console.log(requestedIssue);
                    return deferred.resolve(requestedIssue);
                });

            return deferred.promise;
        }

        function editIssue(issue){
            //TODO: Write logic for edit existing issue
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

        function parseDate(inputDate){
            var outputDate = '';
            var date = new Date(inputDate);
            outputDate = date.getFullYear() + '\/' + (date.getMonth()+1) + '\/' + date.getDate();
            console.log(outputDate);
            return outputDate;
        }

        return {
            addNewIssue: addNewIssue,
            editIssue: editIssue
        }
    }
]);