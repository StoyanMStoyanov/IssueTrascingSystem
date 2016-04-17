/**
 * Created by stoyan.stoyanov on 4/13/2016.
 */
angular.module('mySocialNetwork.users.identity',[])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){

            var deffered = $q.defer();

            var currentUser = undefined;

            var accessToken = 'G234NGCp-z9J1GsjKmfurHYnHYHjg7lQaTonxvJsWmX3qQgpF7Hz3OO9749YVuuE7df_5f75T7pOu0IxQtOW5eq7h17kq4N_SJmuaJnyyR5vqEPUSBONvA2t5hFs5aMPJA_wTnaqvg1VUWycZCIwIZ6w9AMde7sbYtZ1iCbE_PM-TuR5JETKa50AqWSiGboZJi-OXsI5nz4bv74LzDIwdsfscrinUgGc9sO3ScNgQfw0DAXkz6-CjRaHS1NL0NPRKY7c4mPWb6eFofIEDx3hxhdFPsdzKMK7QWQxpfN_ol4g86EZpsm-ft4rVyeWuqS-9LdNR-lUhsKqLMF2I4fDKl4f55bV0wPsG4NJZuqxEEW7ODG9QsURomcVG9xRntKz7v-lN7VL0RkT0Qqs_YmRjyv_iifqz8QVSpUyrALPeR56frbwTft8BXxaEZuR-rZg7AxthmPjUu1trMI5AXmRP8OLjjflS0tOyYU9VLcjry-9vpIA9bjmJcl8APmQKh6-","token_type":"bearer","expires_in":1209599,"userName":"sani@sani.bg",".issued":"Sun, 17 Apr 2016 11:51:27 GMT",".expires":"Sun, 01 May 2016 11:51:27 GMT';

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

            $http.get(BASE_URL + 'user/me')
                .then(function (responce) {
                    console.log(responce.data);
                    currentUser = responce.data;
                    deffered.resolve(currentUser);
            });


            return{
                getCurrentUser: function () {
                    if(currentUser){
                        return $q.when(currentUser);
                    } else {
                        return deffered.promise;
                    }
                },

                isAuthenticated: function () {
                    return true;
                }
            };
    }]);
