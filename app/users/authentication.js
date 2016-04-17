angular.module('issueTrackerSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        console.log(error);
                        console.log('Register error');
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Login', user)
                    .then(function(response) {
                        console.log(response.data);
                        deferred.resolve(response.data);
                    }, function(error) {
                        console.log(error);
                        console.log('Login error')
                    });

                return deferred.promise;
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }]);