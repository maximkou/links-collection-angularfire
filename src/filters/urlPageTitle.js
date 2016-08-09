/**
 * Created by maximkou on 02.08.16.
 */
define(['./_module'], function (module) {
    module
        .filter('urlPageTitle', ['$http', function ($http) {
            function getYqlUrl(url) {
                return "https://query.yahooapis.com/v1/public/yql?q=select+*+from+html+where+url='"
                    + url
                    + "'+and+xpath='//title'&format=json&env=store://datatables.org/alltableswithkeys";
            }

            return function (url) {
                return $http
                    .get(getYqlUrl(url), {
                        cache: true
                    });
            }
        }])
});