'use strict';

angular.module('issueTrackerSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$cookies',
        '$q',
        '$location',
        'identity',
        'BASE_URL',
        'toastr',
        function($http, $cookies, $q, $location, identity, BASE_URL, toastr) {

            var AUTHENTICATION_COOKIE_KEY = '__Authentication_Cookie_Key__';

            function preserveUserData(data){
                var accessToken = data.access_token;
                //console.log(accessToken);
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
            }

            function registerUser(user) {
                var deferred = $q.defer();
                //console.log(user);
                $http.post(BASE_URL + 'api/Account//Register', user)
                    .then(function (user) {
                        console.log(user);
                        toastr.info('User ' + user.config.data.email + ' Register Successfull.','Register');

                    });//тук нямаме error функция, защото ще имаме глобален error handling

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();
                user.grant_type = 'password';
                console.log(user);
                $http({
                    method: 'POST',
                    url: BASE_URL + 'api/Token',
                    data: 'Username=' + user.username
                        + '&Password=' + user.password
                        + '&grant_type=' + user.grant_type,
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).then(function (responce) {
                    preserveUserData(responce.data);
                    identity.requestUserProfile()
                        .then(function () {
                            toastr.info('Success', 'Login successful.');
                            deferred.resolve(responce.data);
                        });
                    });
                /*$http.post(BASE_URL + 'api/Token', user)
                    .then(function(response) {
                        preserveUserData(response.data);
                        debugger;
                        identity.requestUserProfile()
                            .then(function () {
                                //след като някой се логне веднага правим втора завка за да му вземем
                                //user datata - това се случва след като вече сме му сетнали access token-a
                                //това го правим след като имаме целия user
                                deferred.resolve(response.data);
                            }, function (error) {
                                console.log(error);
                            });

                    }); //тук нямаме error функция, защото ще имаме глобален error handling
                */
                return deferred.promise;
            }

            function isAuthenicated(){
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }

            function logout() {
                debugger;
                $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                $http.defaults.headers.common.Authorization = undefined;
                identity.removeUserProfile();
                $location.path('/');
            }

            function refreshCookie(){
                //Проверявам ако имам cookie да го get-на
                if(isAuthenicated()){
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                    identity.requestUserProfile();
                }
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                isAuthenicated: isAuthenicated,
                logout: logout,
                refreshCookie:refreshCookie
            }
        }]);