/**
 * Created by stoyan.stoyanov on 3.5.2016 г..
 */
angular.module('issueTrackerSystem.common.footerDirective', [])
    .directive('parseProjectKey', [function () {
        return {
            restrict: 'A',
            scope: {
                outputValue : '=ngModel'
            },
            link: function (scope, inputString, attrrs) {
                var outputString = {};
                inputString.split(' ')
                    .forEach(function (str) {
                        outputString.push(str[0]);
                });
                $scope.outputValue = attrrs.outputString;
            }
        }
    }]);
