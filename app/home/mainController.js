/**
 * Created by stoyan.stoyanov on 4/29/2016.
 */
'use strict';

angular.module('issueTrascingSystem.home.MainController', [])
    .controller('MainController', [
        '$scope',
        'authentication',
        'identity',
        function ($scope, authentication, identity) {
            if(authentication.isAuthenticated){
                console.log('Authenticated ' + identity.getCurrentUser.name);
                //TODO: redirect to path
                //$location.path('/.......');
            }
        }
    ]);
