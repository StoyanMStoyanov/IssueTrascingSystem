/**
 * Created by stoyan.stoyanov on 4/30/2016.
 */

angular.module('issueTrackerSystem.common.footerDirective', [])
    .directive('footer', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/common/footerDirective.html'
        }
    }]);
