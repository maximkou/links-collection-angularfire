/**
 * Created by maximkou on 02.08.16.
 */

define(['./_module'], function (module) {
    module
        .directive('waitLoader', function () {
            return {
                restrict: 'E',
                template: '<img ng-src="img/loader.gif"/>'
            };
        });
});