/**
 * Created by maximkou on 19.08.16.
 */

define(['./_module'], function (module) {
    module
        .service('FilterState', ['$window', '$log', function ($window, $log) {
            var storageKey = 'filter_state';

            return {
                getState: function () {
                    try {
                        return JSON.parse($window.localStorage.getItem(storageKey));
                    } catch (err) {
                        $log.warn(err);
                        return null;
                    }
                },

                setState: function (filter) {
                    $window.localStorage.setItem(storageKey, JSON.stringify(filter));
                }
            };
        }]);
});