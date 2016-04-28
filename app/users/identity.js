/**
 * Created by stoyan.stoyanov on 4/13/2016.
 */
angular.module('issueTrackerSystem.users.identity',[])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            var differed = $q.defer();

            /*
             Когато искаме да позваме администраторски акаунт обикновенно getUserProfile ще ни върне
             освен всичкиостанали данни за user-a и неговите роли.
             var userData = {
             firstName: '......',
             lastName: '.......',
             ......
             roles: ['Admin', 'Support']
             }
             след това трябва да направим още една проверка както authenticated примерно
             това се случва в контролера след authenticated
             adminCheck: [function(authentication, identity){ - получаваме някакви данни
             if(authentication.isAuthenticated()){
             identity.getUserProfile(); - след като вземем данните на user-a
             return $q.when(true);
             правим проверка и ако си admin прави нещо
             ако не си админ ще върнем 'Unauthorized Access'
             return $q.reject('Unauthorized Access');
             и след това да редиректнем към home или някъде другаде
             }
             }]
             */

            var currentUser = undefined;


            return{
                getCurrentUser: function () {

                    if(currentUser){
                        return $q.when(currentUser);
                    } else {
                        return differed.promise;
                    }
                },

                removeUserProfile: function () {
                    currentUser = undefined;
                },

                requestUserProfile: function () {
                    //Този deffer връща профила на user-a
                    var userProfileDeffered = $q.defer();
                    $http.get(BASE_URL + 'Users/me')
                        .then(function (responce) {
                            currentUser = responce.data;
                            differed.resolve(currentUser);
                            userProfileDeffered.resolve();
                            console.log(currentUser);
                        });

                    return userProfileDeffered.promise;
                }


            };
        }]);
