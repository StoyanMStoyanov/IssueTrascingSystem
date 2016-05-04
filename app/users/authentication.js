'use strict';

angular.module('issueTrackerSystem.users.authentication', [])
    .factory('authentication', [
        '$rootScope',
        '$http',
        '$q',
        '$location',
        'BASE_URL',
        'toastr',
        function($rootScope, $http, $q, $location, BASE_URL, toastr) {

            var currentUser = undefined;
            var userProfile = undefined;
            //var isAdmin = undefined;

            function loginUser(userData) {
                var deferred = $q.defer();
                userData.grant_type = 'password';
                //console.log(userData); //Ok
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: 'Username=' + userData.username
                            + '&Password=' + userData.password
                            + '&grant_type=' + userData.grant_type,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                $http(request).then(function (responce) {

                    preserveUserData(responce.data);

                    requestUserProfile()
                        .then(function () {
                            toastr.info('Success', 'Login successful.');
                            deferred.resolve(responce.data);
                        });
                });
                return deferred.promise;
            }

            function registerUser(userData) {
                var deferred = $q.defer();
                //console.log(user);
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account//Register',
                    data: userData
                };
                $http(request).then(function (user) {
                    var userData = {
                        username: user.config.data.email,
                        password: user.config.data.password
                    };
                    toastr.info('User ' + userData.username + ' Register Successful.');
                    loginUser(userData);
                    });//тук нямаме error функция, защото ще имаме глобален error handling

                return deferred.promise;
            }

            function logout() {
                delete sessionStorage['currentUser'];
                $http.defaults.headers.common.Authorization = undefined;
                toastr.info('Logout!', 'User successfully logout.');
                removeUserProfile();
            }

            function isAuthenticated(){
                return !!sessionStorage['currentUser'];
            }

            function isAnonymous(){
                //console.log(sessionStorage['currentUser'] == undefined);
                //debugger;
                return (sessionStorage['currentUser'] == undefined);
            }

            function isLoggedIn(){
                return sessionStorage['currentUser'] != undefined;
            }

            function refreshSessionStorage(){
                //Проверявам ако имам currentUser в sessionStorage да го get-на
                //след това правя втора заявка за да взема профила на текущия user
                if(isAuthenticated()){
                    $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['currentUser'];
                    requestUserProfile();
                }
            }

            function preserveUserData(data){
                var accessToken = data.access_token;
                //console.log(accessToken);
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                sessionStorage['currentUser'] = JSON.stringify(data);
            }

            function getCurrentUser() {
                var differed = $q.defer();
                if(currentUser){
                    return $q.when(currentUser);
                } else {
                    return differed.promise;
                }
            }

            function getCurrentUser111() {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            }

            function removeUserProfile() {
                currentUser = undefined;
                userProfile = undefined;
            }

            function requestUserProfile() {
                //Този deffer връща профила на user-a
                var userProfileDeffered = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Users/me',
                    headers: {
                        Authorization:  'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token}
                    };
                $http(request).then(function (responce) {
                    currentUser = responce.data;
                    userProfileDeffered.resolve();
                    userProfile = currentUser;
                    //console.log(userProfile.isAdmin);

                });
                return userProfileDeffered.promise;
            }

            function isNormalUser(){
                return (currentUser!= undefined) && (userProfile.isAdmin);
            }

            function isAdmin(){
                //console.log(userProfile.isAdmin);
                return !!userProfile.isAdmin;
            }

            function changePassword(userData){
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/changePassword',
                    data: userData,
                    headers: {Authorization:  'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token}
                };
                $http(request)
                    .then(function () {
                        toastr.info('Password changed successfully.');
                        $location.path('dashboard')
                    })
            }

            function getAllUsers(){
                var users = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/',
                    headers: {Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token}
                };
                $http(request)
                    .then(function(responce){
                        users.resolve(responce.data);
                        $rootScope.Users = responce.data;
                        //console.log(responce);
                    });
                return users.promise;
            }

            function makeAdmin (userId){
                userId = userId || 'cbe9c46d-9150-42d9-a641-3c504b3043e9';
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'users/makeadmin',
                    data: 'userId=' + userId,
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(sessionStorage['currentUser']).access_token,
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                };
                console.log(request);
                $http(request).then(function () {
                    toastr.info('User:' + currentUser.userName  + ' is admin.')
                });
            }

            function getUserProfile(){
                return userProfile;
            }

            return {
                loginUser: loginUser,
                registerUser: registerUser,
                logout: logout,
                isAuthenticated: isAuthenticated,
                isAnonymous: isAnonymous,
                isLoggedIn: isLoggedIn,
                refreshSessionStorage:refreshSessionStorage,
                getCurrentUser: getCurrentUser,
                removeUserProfile: removeUserProfile,
                requestUserProfile: requestUserProfile,
                isNormalUser: isNormalUser,
                isAdmin: isAdmin,
                changePassword: changePassword,
                getAllUsers: getAllUsers,
                makeAdmin: makeAdmin,
                getUserProfile: getUserProfile
            }
        }]);