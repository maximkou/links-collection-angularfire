/**
 * Created by maximkou on 02.08.16.
 */
define(['./_module'], function (module) {
    module
        .filter('favicon', function () {
            return function (url) {
                return 'https://www.google.com/s2/favicons?domain=' + url;
            }
        })
});